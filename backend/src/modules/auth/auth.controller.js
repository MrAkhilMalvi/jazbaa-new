import * as service from "./auth.service.js";
import { setAuthCookies } from "../../utils/cookies.js";
import pool from "../../config/db.js";

export const getMe = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id,email,avatar FROM users WHERE id=$1",
      [req.user.id]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};


export const signup = async (req, res, next) => {
  try {
    const user = await service.signupUser(req.body);

    res.status(201).json({
      message: "Signup successful",
      user
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const meta = {
      ua: req.headers["user-agent"],
      ip: req.ip
    };

    const { user, accessToken, refreshToken } =
      await service.loginUser(req.body.email, req.body.password, meta);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({ message: "Login successful", user });
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } =
      await service.googleUser(req.body.token);

      console.log("TOKEN:", req.body.token);

    setAuthCookies(res, accessToken, refreshToken);

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await service.logoutUser(req.cookies.refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};