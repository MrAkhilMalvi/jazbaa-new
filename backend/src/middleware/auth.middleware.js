import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // ❌ No token
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // ✅ Verify access token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      // 🔁 If access token expired → try refresh token
      if (err.name === "TokenExpiredError" && refreshToken) {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET
        );

        // ✅ Check session exists in DB
        const session = await pool.query(
          "SELECT * FROM sessions WHERE refresh_token=$1",
          [refreshToken]
        );

        if (!session.rows.length) {
          return res.status(401).json({ message: "Session expired" });
        }

        // 🔄 Generate new access token
        const newAccessToken = jwt.sign(
          { id: decodedRefresh.id },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        // 🍪 Set new cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax"
        });

        req.user = { id: decodedRefresh.id };
        return next();
      }

      return res.status(401).json({ message: "Invalid token" });
    }

  } catch (err) {
    next(err);
  }
};