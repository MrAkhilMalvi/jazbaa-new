import { forgotPasswordApi } from "@/services/auth.service";
import { useState } from "react";
import { toast } from "sonner";



const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPasswordApi(email);

      toast.success(res.data.message || "Reset link sent successfully");

      setEmail("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-2 text-center text-black dark:text-white">
          Forgot Password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
