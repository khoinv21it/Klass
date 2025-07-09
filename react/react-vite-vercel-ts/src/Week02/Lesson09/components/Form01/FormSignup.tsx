import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInput {
  name: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup.string().required("Password is required").min(6),
});

export default function FormSignup() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setUsername(data.name);
  };

  return (
    <div className="w-full h-[500px] max-w-sm mx-auto px-4">
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 space-y-4">

        <p className="text-sm text-white leading-relaxed">
          Looks like you don't have an account. <br />
          Let's create a new account for <br />
          <span className="font-semibold text-white">jane.doe@gmail.com</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="w-full py-2 px-3 rounded-md bg-white text-black text-sm outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <p className="text-[11px] text-white leading-snug">
            By selecting Agree and continue below, <br />I agree to{" "}
            <span className="text-green-400 underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-green-400 underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-green-600 transition"
          >
            Agree and continue
          </button>
        </form>
      </div>
    </div>
  );
}

let username = "";
export const setUsername = (value: string) => {
  username = value;
};

export const getUsername = () => {
  return username;
};
