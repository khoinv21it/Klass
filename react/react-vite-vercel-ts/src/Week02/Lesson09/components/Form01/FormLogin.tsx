import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUsername } from "./FormSignup";

interface IFormInput {
  password: string;
}

const schema = yup.object({
  password: yup.string().required("Password is required").min(6),
});

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const username = getUsername();

  return (
    <div className="w-full h-[500px] max-w-sm mx-auto px-4">
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gray-300">
            <img className="rounded-full" src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-doi-lot-soi.jpg?1704788224743" alt="" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">
              {username || "Jane Dow"}
            </p>
            <p className="text-white text-xs">jane.doe@gmail.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full py-2 px-3 rounded-md bg-white text-black text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {showPassword ? "Hide" : "View"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-green-600 transition"
          >
            Continue
          </button>

          <p className="text-sm text-blue-400 text-center cursor-pointer hover:underline">
            Forgot your password?
          </p>
        </form>
      </div>
    </div>
  );
}
