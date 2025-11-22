import React, { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
// Importing a simple icon for professionalism (requires 'lucide-react' or similar icon library)
// For this example, we'll assume a lock icon class 'lucide-lock' is available via a custom component or imported library.

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  // Validation functions remain the same
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

    // Note: It's common practice to skip strict password validation on LOGIN
    // and only validate for required field presence, as the password already exists.
    // However, keeping the existing validation logic for completeness:
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    // Removing strict password criteria check for login to improve UX
    // (A user shouldn't be told their existing password is "too weak" on a login form)

    setErrors(newErrors);
    setFirebaseError(""); // Clear previous Firebase errors

    if (Object.keys(newErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
      } catch (err) {
        // Firebase error codes are more professional than raw message
        let errorMessage = "An unexpected error occurred.";
        if (err.code === "auth/invalid-credential") {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (err.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else {
          errorMessage = err.message.replace("Firebase: ", "");
        }
        setFirebaseError(errorMessage);
      }
    }
  };

  // Optional: Keeping this for the password requirement visibility check
  const passCheck = validatePassword(password);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Navbar - Assuming Header component is well-designed */}
      <Header />

      {/* Login Box */}
      <div className="flex flex-1 items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 md:p-12 w-full max-w-md my-12"
        >
          {/* Lock Icon and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 mb-4 bg-indigo-100 rounded-full">
              {/* Replace with a real icon component */}
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
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 select-none tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access all your data securely.
            </p>
          </div>

          {/* Firebase/Global Error */}
          {firebaseError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              <p>{firebaseError}</p>
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
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.email
                  ? "border-red-500 placeholder-red-300"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`appearance-none relative block w-full px-4 py-3 border ${
                errors.password
                  ? "border-red-500 placeholder-red-300"
                  : "border-gray-300 focus:border-indigo-500"
              } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition duration-150 ease-in-out sm:text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

            {/* Optional: Password checks (hidden by default on login forms) */}
            {password && Object.keys(errors).length === 0 && (
              <div className="mt-2 text-xs text-gray-500">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Sign In
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
