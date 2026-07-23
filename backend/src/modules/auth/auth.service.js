import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendResetEmail, sendWelcomeEmail } from "../../utils/mail.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Standard Email/Password Registration
 */
export const signupUser = async (data) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    city,
    state,
    country,
    ageGroup,
    category,
    interests,
    password,
    consent,
  } = data;

  if (!email || !consent) {
    throw new Error("INVALID_INPUT");
  }

  if (interests && Array.isArray(interests) && interests.length > 3) {
    throw new Error("MAX_3_INTERESTS");
  }

  const existing = await pool.query("SELECT id FROM users WHERE email=$1", [
    email,
  ]);

  if (existing.rows.length) {
    throw new Error("USER_EXISTS");
  }

  const hashed = password ? await bcrypt.hash(password, 10) : null;

  const result = await pool.query(
    `INSERT INTO users(
      first_name,
      last_name,
      email,
      mobile,
      city,
      state,
      country,
      age_group,
      category,
      interests,
      password,
      consent,
      is_profile_completed
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true)
    RETURNING id, email, first_name, last_name, avatar, is_profile_completed`,
    [
      firstName,
      lastName,
      email,
      mobile,
      city,
      state,
      country || "India",
      ageGroup,
      category || "Member",
      interests || [],
      hashed,
      consent,
    ]
  );

  const user = result.rows[0];

  try {
    await sendWelcomeEmail(user.email, user.first_name);
  } catch (err) {
    console.error("Welcome email failed:", err);
  }

  return user;
};

/**
 * Standard Email/Password Login
 */
export const loginUser = async (email, password, meta) => {
  const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (!userRes.rows.length) throw new Error("NOT_FOUND");

  const user = userRes.rows[0];

  if (!user.password) throw new Error("USE_GOOGLE_LOGIN");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("INVALID");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await pool.query(
    `INSERT INTO sessions(user_id, refresh_token, user_agent, ip_address, expires_at)
     VALUES($1, $2, $3, $4, NOW() + interval '7 days')`,
    [user.id, refreshToken, meta?.ua || "", meta?.ip || ""]
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      is_profile_completed: user.is_profile_completed ?? true,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Google ID Token Verification and User Setup
 */
export const googleUser = async (token, meta) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, sub, picture, name } = payload;

  let userRes = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  let user;

  if (!userRes.rows.length) {
    // New Google user: is_profile_completed defaults to false
    const insert = await pool.query(
      `INSERT INTO users(email, google_id, avatar, first_name, consent, is_profile_completed)
       VALUES($1, $2, $3, $4, true, false) RETURNING *`,
      [email, sub, picture, name]
    );

    user = insert.rows[0];

    try {
      await sendWelcomeEmail(user.email, user.first_name);
    } catch (err) {
      console.error("Welcome email failed:", err);
    }
  } else {
    user = userRes.rows[0];

    if (!user.avatar && picture) {
      await pool.query("UPDATE users SET avatar=$1 WHERE id=$2", [
        picture,
        user.id,
      ]);
      user.avatar = picture;
    }
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await pool.query(
    `INSERT INTO sessions(user_id, refresh_token, user_agent, ip_address, expires_at)
     VALUES($1, $2, $3, $4, NOW() + interval '7 days')`,
    [user.id, refreshToken, meta?.ua || "", meta?.ip || ""]
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      is_profile_completed: user.is_profile_completed ?? false,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Complete Google/Incomplete User Profile details & issue upgraded JWT Session
 */
export const completeProfile = async (userId, data, meta = {}) => {
  const {
    firstName,
    lastName,
    mobile,
    city,
    state,
    country,
    ageGroup,
    category,
    interests,
    password,
  } = data;

  if (interests && Array.isArray(interests) && interests.length > 3) {
    throw new Error("MAX_3_INTERESTS");
  }

  // Hash password if the user is setting one up for the first time
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const result = await pool.query(
    `UPDATE users
     SET 
       first_name = COALESCE($1, first_name),
       last_name = COALESCE($2, last_name),
       mobile = $3,
       city = $4,
       state = $5,
       country = COALESCE($6, 'India'),
       age_group = $7,
       category = COALESCE($8, 'Member'),
       interests = $9,
       password = COALESCE($10, password),
       is_profile_completed = true
     WHERE id = $11
     RETURNING id, email, first_name, last_name, avatar, mobile, city, state, country, age_group, category, interests, is_profile_completed`,
    [
      firstName,
      lastName,
      mobile,
      city,
      state,
      country,
      ageGroup,
      category,
      interests || [],
      hashedPassword,
      userId,
    ]
  );

  if (!result.rows.length) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = result.rows[0];

  // Issue brand-new access and refresh tokens after finalizing profile setup
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await pool.query(
    `INSERT INTO sessions(user_id, refresh_token, user_agent, ip_address, expires_at)
     VALUES($1, $2, $3, $4, NOW() + interval '7 days')`,
    [user.id, refreshToken, meta?.ua || "", meta?.ip || ""]
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/**
 * Logout User & Invalidate Session
 */
export const logoutUser = async (refreshToken) => {
  await pool.query("DELETE FROM sessions WHERE refresh_token=$1", [
    refreshToken,
  ]);
};

/**
 * Send Password Reset Token
 */
export const forgotPassword = async (email) => {
  try {
    const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!userRes.rows.length) {
      console.log("⚠️ Email not found in database.");
      return true;
    }

    const user = userRes.rows[0];

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await pool.query("DELETE FROM password_resets WHERE user_id=$1", [user.id]);

    await pool.query(
      `INSERT INTO password_resets(user_id, token, expires_at) VALUES($1, $2, $3)`,
      [user.id, token, expires]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendResetEmail(email, resetLink);

    return true;
  } catch (error) {
    console.error("Error in forgotPassword workflow:", error);
    throw error;
  }
};

/**
 * Reset Password with valid token
 */
export const resetPassword = async (token, password) => {
  try {
    const tokenRes = await pool.query(
      `SELECT * FROM password_resets WHERE token=$1`,
      [token]
    );

    if (!tokenRes.rows.length) {
      console.log("❌ [Reset Password] Token not found in database.");
      throw new Error("INVALID_TOKEN");
    }

    const resetData = tokenRes.rows[0];

    if (new Date(resetData.expires_at) < new Date()) {
      console.log("❌ [Reset Password] Token has expired.");
      throw new Error("TOKEN_EXPIRED");
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(`UPDATE users SET password=$1 WHERE id=$2`, [
      hashed,
      resetData.user_id,
    ]);
    await pool.query(`DELETE FROM password_resets WHERE token=$1`, [token]);
    
    return true;
  } catch (error) {
    console.error("❌ CRITICAL ERROR in resetPassword workflow:", error);
    throw error;
  }
};