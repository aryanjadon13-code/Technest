import React, { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(""); // 🔹 Firebase error

  // email check
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // password check
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setAuthError(""); // Clear previous errors

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    const passCheck = validatePassword(password);
    if (
      !(
        passCheck.length &&
        passCheck.lowercase &&
        passCheck.uppercase &&
        passCheck.number &&
        passCheck.specialChar
      )
    ) {
      newErrors.password =
        "Password must be 8+ chars, have uppercase, lowercase, number & special symbol";
    }

    if (password !== confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered successfully ✅");
        navigate("/home");
      } catch (err) {
        console.error(err.message);
        // Display user-friendly error messages for common auth issues
        let errorMessage = err.message
          .replace("Firebase: Error ", "")
          .replace(" (auth/", " - ");
        setAuthError(errorMessage);
      }
    }
  };

  const passCheck = validatePassword(password);

  return (
    // 1. Updated Background to soft gray
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Header />

      <div className="flex flex-1 items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          // 2. Updated Card Style: shadow-2xl and rounded-2xl, centered margin
          className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 md:p-12 w-full max-w-md my-12"
        >
          {/* 3. Professional Icon and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 mb-4 bg-indigo-100 rounded-full">
              {/* User Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 select-none tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your journey with us today.
            </p>
          </div>

          {/* 4. Firebase Auth Error (Styled as a professional alert) */}
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{authError}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // 5. Updated Input Styling: rounded-lg, indigo focus
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // 5. Updated Input Styling: rounded-lg, indigo focus
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* 6. Password checks (Updated list styling) */}
          {password && (
            <ul className="text-sm mb-6 space-y-1 ml-4 list-disc list-inside">
              <li
                className={passCheck.length ? "text-green-600" : "text-red-500"}
              >
                At least 8 characters
              </li>
              <li
                className={
                  passCheck.lowercase ? "text-green-600" : "text-red-500"
                }
              >
                Lowercase letter
              </li>
              <li
                className={
                  passCheck.uppercase ? "text-green-600" : "text-red-500"
                }
              >
                Uppercase letter
              </li>
              <li
                className={passCheck.number ? "text-green-600" : "text-red-500"}
              >
                Number
              </li>
              <li
                className={
                  passCheck.specialChar ? "text-green-600" : "text-red-500"
                }
              >
                Special character (!@#$%^&*)
              </li>
            </ul>
          )}

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              // 5. Updated Input Styling: rounded-lg, indigo focus
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.confirm
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            // 7. Updated Button Style: indigo theme, better spacing
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
