import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../utils/token.js";
import { OAuth2Client } from "google-auth-library";

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
    consent
  } = data;

  // 🔴 Validation
  if (!email || !consent) {
    throw new Error("INVALID_INPUT");
  }

  if (interests && interests.length > 3) {
    throw new Error("MAX_3_INTERESTS");
  }

  // 🔍 Check existing user
  const existing = await pool.query(
    "SELECT id FROM users WHERE email=$1",
    [email]
  );

  if (existing.rows.length) {
    throw new Error("USER_EXISTS");
  }

  // 🔐 Hash password
  const hashed = password ? await bcrypt.hash(password, 10) : null;

  // 💾 Insert FULL data
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
    RETURNING id, email`,
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
      consent
    ]
  );

  return result.rows[0];
};

// 🔵 Login
export const loginUser = async (email, password, meta) => {
  const userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!userRes.rows.length) throw new Error("NOT_FOUND");

  const user = userRes.rows[0];

  const match = await bcrypt.compare(password, user.password || "");
  if (!match) throw new Error("INVALID");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await pool.query(
    `INSERT INTO sessions(user_id,refresh_token,user_agent,ip_address,expires_at)
     VALUES($1,$2,$3,$4,NOW() + interval '7 days')`,
    [user.id, refreshToken, meta.ua, meta.ip]
  );

  return { user, accessToken, refreshToken };
};

// 🔵 Google Login
// 🔵 Google Login (UPDATED)
export const googleUser = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { email, name, sub, picture } = payload;

  let userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  let user;

  if (!userRes.rows.length) {
    // ✅ SAVE avatar from Google
    const insert = await pool.query(
      `INSERT INTO users(email, google_id, avatar, consent)
       VALUES($1,$2,$3,true) RETURNING *`,
      [email, sub, picture]
    );

    user = insert.rows[0];
  } else {
    user = userRes.rows[0];

    // ✅ Update avatar if missing
    if (!user.avatar && picture) {
      await pool.query(
        "UPDATE users SET avatar=$1 WHERE id=$2",
        [picture, user.id]
      );

      user.avatar = picture;
    }
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

// 🔴 Logout
export const logoutUser = async (refreshToken) => {
  await pool.query(
    "DELETE FROM sessions WHERE refresh_token=$1",
    [refreshToken]
  );
};