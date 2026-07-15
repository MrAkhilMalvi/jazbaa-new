import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// ✅ Required for Render / reverse proxy
app.set("trust proxy", 1);

// ✅ Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "https://jazbaa.naviralife.co.in",
  "https://www.jazbaa.naviralife.co.in",
  "https://jazbaa.co.in",
  "https://www.jazbaa.co.in",  
  process.env.CLIENT_URL,
].filter(Boolean);

// ✅ CORS
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin);

      // Postman / mobile apps
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = origin.replace(/\/$/, "");

      const allowed = allowedOrigins.some(
        (o) => o.replace(/\/$/, "") === cleanOrigin
      );

      if (allowed) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

// ✅ Debug middleware
app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  next();
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.status(200).send("Jazbaa API running 🚀");
});

// ✅ Error handler
app.use(errorHandler);

export default app;