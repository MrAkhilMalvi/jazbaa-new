export const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Default
  let statusCode = 500;
  let message = "Internal Server Error";

  // ✅ Custom app errors
  if (err.message === "USER_EXISTS") {
    statusCode = 409;
    message = "User already exists";
  }

  if (err.message === "INVALID_INPUT") {
    statusCode = 400;
    message = "Invalid input data";
  }

  if (err.message === "MAX_3_INTERESTS") {
    statusCode = 400;
    message = "Max 3 interests allowed";
  }

  if (err.message === "NOT_FOUND") {
    statusCode = 404;
    message = "User not found";
  }

  if (err.message === "INVALID") {
    statusCode = 401;
    message = "Invalid credentials";
  }

  // ✅ PostgreSQL errors (very important)
  if (err.code === "23505") {
    statusCode = 409;
    message = "Duplicate value (email already exists)";
  }

  // ✅ JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};