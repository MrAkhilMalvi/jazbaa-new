import * as service from "./auth.service.js";
import { setAuthCookies } from "../../utils/cookies.js";
import pool from "../../config/db.js";

const isProd = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
};


/**
 * Email/Password Signup
 */
export const signup = async (req, res, next) => {
  try {
    const user = await service.signupUser(req.body);

    res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Email/Password Login
 */
export const login = async (req, res, next) => {
  try {
    const meta = {
      ua: req.headers["user-agent"],
      ip: req.ip,
    };

    const { user, accessToken, refreshToken } =
      await service.loginUser(req.body.email, req.body.password, meta);

    // Set secure HTTP-only auth cookies
    setAuthCookies(res, accessToken, refreshToken);

    res.json({ message: "Login successful", user });
  } catch (err) {
    next(err);
  }
};

/**
 * Google OAuth Login / Initial Registration
 */
export const googleLogin = async (req, res, next) => {
  try {
    const meta = {
      ua: req.headers["user-agent"],
      ip: req.ip,
    };

    const { user, accessToken, refreshToken } =
      await service.googleUser(req.body.token, meta);

    // Set cookies so user has authentication token active
    if (accessToken && refreshToken) {
      setAuthCookies(res, accessToken, refreshToken);
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/**
 * Save Google / New user's missing profile details
 */
export const completeProfile = async (req, res, next) => {
  try {
    // Read user ID either from authenticate middleware (req.user.id) or body payload fallback
    const userId = req.user?.id || req.body?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Missing user reference." });
    }

    const meta = {
      ua: req.headers["user-agent"],
      ip: req.ip,
    };

    const { user, accessToken, refreshToken } = await service.completeProfile(userId, req.body, meta);

    // If service returns upgraded tokens, set cookies to finalize login
    if (accessToken && refreshToken) {
      setAuthCookies(res, accessToken, refreshToken);
    }

    res.json({
      message: "Profile setup completed successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Logout
 */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (refreshToken) {
      await service.logoutUser(refreshToken);
    }

    res.clearCookie("accessToken", COOKIE_OPTIONS);
    res.clearCookie("refreshToken", COOKIE_OPTIONS);

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * Forgot Password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    await service.forgotPassword(req.body.email);

    res.json({
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    await service.resetPassword(token, password);

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};