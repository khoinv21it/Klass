import { useContext } from "react";
import AuthContext from "../context";
import { useNavigate } from "react-router";

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
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
    console.log("Form submitted:", data);

    // Call API to authenticate user
    const result = await login(data.username, data.password);
    console.log("Login result:", result);

    const authenticatedUser = {
      id: result.loggedInUser.id,
      email: result.loggedInUser.email,
      access_token: result.access_token,
    };

    setUser(authenticatedUser);

    // save user info to localStorage
    localStorage.setItem("user", JSON.stringify(authenticatedUser));

    // save access token to localStorage
    localStorage.setItem("access_token", result.access_token);

    window.location.href = "/lesson10/tasks"; // Redirect to tasks page
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
