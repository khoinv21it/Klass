import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

type Props = {};

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters."),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format."),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain letters")
      .matches(/[0-9]/, "Password must contain numbers"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\d{10,}$/, "Phone Number must be at least 10 digits"),
    gender: yup.string().required("Gender is required"),
    dob: yup
      .string()
      .required("Date of Birth is required")
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false;
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (
          age > 18 ||
          (age === 18 && m >= 0 && today.getDate() >= dob.getDate())
        ) {
          return true;
        }
        return false;
      }),
    country: yup.string().required("Country is required"),
    // hobbies: yup.array().min(1, "Select at least one hobby"),
    profilePicture: yup
      .mixed()
      .required("Profile Picture is required")
      .test(
        "fileType",
        "Only .jpg, .jpeg, and .png files are allowed",
        (files) => {
          if (!files || !(files instanceof FileList)) return false;
          const file = files[0];
          return ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
        }
      ),
    // bio: yup.string().max(300, "Bio must be at most 300 characters").nullable(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Homework({}: Props) {
//   const [bioText, setBioText] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
  };

//   const bioValue = watch("bio", "");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 space-y-5 bg-white shadow-md rounded-md"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block font-medium">
          Full Name
        </label>
        <input 
          id="fullName"
          type="text"
          {...register("fullName")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input 
          id="email"
          type="email"
          {...register("email")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input 
          id="password"
          type="password"
          {...register("password")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block font-medium">
          Confirm Password
        </label>
        <input 
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block font-medium">
          Phone Number
        </label>
        <input 
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.phoneNumber && (
          <p className="text-red-600 text-sm mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Gender */}
      <div>
        <span className="font-medium">Gender</span>
        <div className="flex gap-4 mt-1">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g}>
              <input 
                type="radio"
                value={g}
                {...register("gender")}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dob" className="block font-medium">
          Date of Birth
        </label>
        <input 
          id="dob"
          type="date"
          {...register("dob")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.dob && (
          <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>
        )}
      </div>

      {/* Hobbies */}
      {/* <div>
        <span className="font-medium">Hobbies</span>
        <div className="flex gap-4 mt-1">
          {["Reading", "Traveling", "Gaming"].map((h) => (
            <label key={h}>
              <input 
                type="checkbox"
                value={h}
                {...register("hobbies")}
                className="mr-1"
              />
              {h}
            </label>
          ))}
        </div>
        {errors.hobbies && (
          <p className="text-red-600 text-sm mt-1">{errors.hobbies.message}</p>
        )}
      </div> */}

      {/* Profile Picture */}
      <div>
        <label htmlFor="profilePicture" className="block font-medium">
          Profile Picture
        </label>
        <input 
          id="profilePicture"
          type="file"
          accept=".jpg,.jpeg,.png"
          {...register("profilePicture")}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
        {errors.profilePicture && (
          <p className="text-red-600 text-sm mt-1">
            {errors.profilePicture.message}
          </p>
        )}
      </div>

      {/* Bio */}
      {/* <div>
        <label htmlFor="bio" className="block font-medium">
          Bio (optional, max 300 chars)
        </label>
        <textarea
          id="bio"
          rows={4}
          {...register("bio")}
          maxLength={300}
          onChange={(e) => setBioText(e.target.value)}
          className="w-full mt-1 input"
        />
        <p className="text-gray-500 text-xs text-right">
          {300 - bioText.length} chars remaining
        </p>
        {errors.bio && (
          <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
}
