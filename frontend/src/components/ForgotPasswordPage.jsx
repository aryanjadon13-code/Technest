import React, { useState } from "react";
import Header from "./Header";
import { auth } from "../Firebase"; // Import your Firebase auth instance
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    // Simple email validation
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Success! Check your inbox for instructions to reset your password.");
      setEmail(""); // Clear the input field
    } catch (err) {
      // Handle Firebase errors
      let errorMessage = "Failed to send reset email. Please try again.";
      if (err.code === "auth/user-not-found") {
        // IMPORTANT: For security, Firebase often sends a generic success message
        // even if the email isn't found, to prevent email enumeration.
        // However, if your Firebase rules allow, this error might show up.
        // We'll show a slightly more helpful, but still secure, message.
        errorMessage = "If an account exists for this email, a password reset link has been sent.";
        setMessage(errorMessage); // Use the message state for this specific case
        setError("");
        setEmail("");
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is not valid.");
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header />

      <div className="flex flex-1 items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 md:p-12 w-full max-w-md my-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 tracking-tight">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center mb-8">
            Enter your email to receive a password reset link.
          </p>

          {/* Success Message */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{message}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{error}</p>
            </div>
          )}
          
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none relative block w-full px-4 py-3 border ${
                error && !message ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
          </div>

          {/* Send Reset Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Send Reset Link
          </button>
          
          {/* Back to Login Link */}
          <p className="text-center text-sm mt-6 text-gray-600">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;