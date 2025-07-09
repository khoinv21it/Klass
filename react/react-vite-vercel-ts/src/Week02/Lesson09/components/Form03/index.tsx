import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type Props = {};

type FormData = yup.InferType<typeof schema>;

export default function Form03({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("✅ Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-[#f5f7fa] p-10 relative flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Set Your Partner
            <br />
            <span className="text-blue-600">Recruitment on Auto-Pilot</span>
          </h2>
          <div className="relative w-full flex justify-center mt-10">
            <img
              src="/images/Lesson09/form3.png"
              alt="Main Visual"
              className="w-64 h-64 object-cover z-10"
            />
            <div className="absolute left-0 top-0 w-16 h-16 bg-yellow-400 rounded-full shadow-md" />
            <div className="absolute right-0 top-12 w-16 h-16 bg-red-400 rounded-full shadow-md" />
            <div className="absolute bottom-0 left-8 w-16 h-16 bg-blue-400 rounded-full shadow-md" />
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-1/2 p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-start gap-x-3 mb-6">
              <img
                src="https://e7.pngegg.com/pngimages/982/140/png-clipart-garena-rov-mobile-moba-league-of-legends-computer-icons-random-icons-text-logo-thumbnail.png"
                alt="Grovia Logo"
                className="h-6"
              />
              <h3 className="text-lg font-bold text-gray-500">Garena</h3>
            </div>
            <h3 className="text-lg font-bold text-red-600">Login</h3>
            <p className="mb-6 text-sm text-gray-600">
              Login to your account
              <br />
              Thank you for getting back to Grovia, lets access our the best
              recruitment services for you.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Email or Phone Number"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-red-400 text-sm">{errors.username?.message}</span>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                {/* Mắt toggle */}
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-9 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </div>
                <span className="text-red-400 text-sm">{errors.password?.message}</span>
                <div className="text-right mt-1">
                  <a href="#" className="text-sm text-red-500 hover:underline">
                    Reset Password?
                  </a>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isValid}
              >
                SIGN IN
              </button>

              <p className="mt-4 text-sm text-center text-gray-600">
                Don’t have an account yet?
                <a href="#" className="text-red-500 hover:underline">
                  Join Grovia Now!
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
