"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../services";

interface IFormInput {
  username: string;
  password: string;
}

// Validation schema using Yup
const schema = yup
  .object({
    username: yup
      .string()
      .email("Email is invalid")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  })
  .required();

export default function LoginPage() {
  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "tungnt@softech.vn",
      password: "123456789",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Call API to authenticate user
    const result = await login(data.username, data.password);
    const authenticatedUser = {
      id: result.loggedInUser.id,
      email: result.loggedInUser.email,
      access_token: result.access_token,
    };
    // save user info to localStorage
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
    // save access token to localStorage
    localStorage.setItem("access_token", result.access_token);
    window.location.href = "/lesson12"; // Redirect to tasks page
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-7 border border-blue-100"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">
            Sign In
          </h2>
          <p className="text-blue-500 text-sm">
            Welcome back! Please login to your account.
          </p>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-1"
          >
            Email
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 ${
              errors.username ? "border-red-500" : "border-blue-200"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-1"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 ${
              errors.password ? "border-red-500" : "border-blue-200"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-bold shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg tracking-wide"
        >
          Login
        </button>
      </form>
    </div>
  );
}
