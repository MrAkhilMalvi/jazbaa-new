import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// ✅ Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const cors = require("cors");

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",

  // Bluehost frontend domain
  "https://jazbaa.naviralife.co.in",
  "https://www.jazbaa.naviralife.co.in",

  // optional from env
  process.env.CLIENT_URL,
];

// ✅ CORS Config
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming Origin:", origin);

      // allow Postman / mobile apps / server requests
      if (!origin) {
        return callback(null, true);
      }

      // remove trailing slash safety
      const cleanOrigin = origin.replace(/\/$/, "");

      const isAllowed = allowedOrigins.some(
        (allowed) =>
          allowed &&
          allowed.replace(/\/$/, "") === cleanOrigin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed: ${origin}`));
      }
    },

    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Jazbaa API running 🚀");
});

// ✅ Error handler (LAST)
app.use(errorHandler);

export default app;