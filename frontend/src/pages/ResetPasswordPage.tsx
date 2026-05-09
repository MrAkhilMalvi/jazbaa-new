import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { resetPasswordApi } from "../api/Auth.api";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const res =
        await resetPasswordApi(
          token!,
          password
        );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Reset Password
        </h1>

        <p className="text-gray-500 text-sm mb-6 text-center">
          Enter your new password
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;