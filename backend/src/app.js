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

const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:3000",
  "https://jazbaa.naviralife.co.in",
  "https://www.jazbaa.naviralife.co.in",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin);

      // allow Postman/mobile apps
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = origin.replace(/\/$/, "");

      const allowed = allowedOrigins.some(
        (o) => o.replace(/\/$/, "") === cleanOrigin,
      );

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },

    credentials: true,
  }),
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
