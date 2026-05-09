import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendResetEmail } from "../../utils/mail.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔵 Signup
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

  if (interests && interests.length > 3) {
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
      consent
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    RETURNING id,email,first_name,avatar`,
    [
      firstName,
      lastName,
      email,
      mobile,
      city,
      state,
      country || "India",
      ageGroup,
      category,
      interests,
      hashed,
      consent,
    ],
  );

  return result.rows[0];
};

// 🔵 Login
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
    `INSERT INTO sessions(user_id,refresh_token,user_agent,ip_address,expires_at)
     VALUES($1,$2,$3,$4,NOW() + interval '7 days')`,
    [user.id, refreshToken, meta.ua, meta.ip],
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      avatar: user.avatar,
    },
    accessToken,
    refreshToken,
  };
};

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
    const insert = await pool.query(
      `INSERT INTO users(email, google_id, avatar, first_name, consent)
       VALUES($1,$2,$3,$4,true) RETURNING *`,
      [email, sub, picture, name],
    );

    user = insert.rows[0];
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
    `INSERT INTO sessions(user_id,refresh_token,user_agent,ip_address,expires_at)
     VALUES($1,$2,$3,$4,NOW() + interval '7 days')`,
    [user.id, refreshToken, meta?.ua || "", meta?.ip || ""],
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      avatar: user.avatar,
    },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (refreshToken) => {
  await pool.query("DELETE FROM sessions WHERE refresh_token=$1", [
    refreshToken,
  ]);
};

export const forgotPassword = async (email) => {
  const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (!userRes.rows.length) {
    return true;
  }

  const user = userRes.rows[0];
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 15);

  await pool.query("DELETE FROM password_resets WHERE user_id=$1", [user.id]);

  // insert new token
  await pool.query(
    `INSERT INTO password_resets(
      user_id,
      token,
      expires_at
    )
    VALUES($1,$2,$3)`,
    [user.id, token, expires],
  );

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendResetEmail(email, resetLink);

  return true;
};

export const resetPassword = async (token, password) => {
  const tokenRes = await pool.query(
    `SELECT * FROM password_resets
     WHERE token=$1`,
    [token],
  );

  if (!tokenRes.rows.length) {
    throw new Error("INVALID_TOKEN");
  }

  const resetData = tokenRes.rows[0];

  // check expiry
  if (new Date(resetData.expires_at) < new Date()) {
    throw new Error("TOKEN_EXPIRED");
  }

  const hashed = await bcrypt.hash(password, 10);

  // update password
  await pool.query(
    `UPDATE users
     SET password=$1
     WHERE id=$2`,
    [hashed, resetData.user_id],
  );

  // delete token after use
  await pool.query(
    `UPDATE password_resets
SET used = true
WHERE token=$1`,
    [token],
  );

  return true;
};
