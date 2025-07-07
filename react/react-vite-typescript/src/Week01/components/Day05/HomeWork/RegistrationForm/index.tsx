import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    hobbies: [] as string[],
    bio: "",
    profilePicture: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bioCharsLeft, setBioCharsLeft] = useState(300);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "hobbies") {
      const checked = (e.target as HTMLInputElement).checked;
      const hobby = value;
      setForm((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, hobby]
          : prev.hobbies.filter((h) => h !== hobby),
      }));
    } else if (name === "bio") {
      setBioCharsLeft(300 - value.length);
      setForm((prev) => ({ ...prev, bio: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, profilePicture: file || null }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (form.fullName.trim().length < 3)
      newErrors.fullName = "Full Name must be at least 3 characters.";

    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email address.";

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters with letters and numbers.";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!/^\d{10,}$/.test(form.phone))
      newErrors.phone = "Phone number must be at least 10 digits.";

    if (!form.gender) newErrors.gender = "Please select a gender.";

    if (
      !form.dob ||
      new Date().getFullYear() - new Date(form.dob).getFullYear() < 18
    ) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    if (!form.country) newErrors.country = "Please select a country.";

    if (form.hobbies.length === 0)
      newErrors.hobbies = "Select at least one hobby.";

    if (form.profilePicture) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(form.profilePicture.type)) {
        newErrors.profilePicture =
          "Invalid file type. Only .jpg, .jpeg, .png allowed.";
      }
    } else {
      newErrors.profilePicture = "Please upload a profile picture.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Registered successfully!");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <div className={styles.field}>
        <label>Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && (
          <div className={styles.error}>{errors.fullName}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}
      </div>

      <div className={styles.field}>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <div className={styles.error}>{errors.confirmPassword}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
      </div>

      <div className={styles.field}>
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleInputChange}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleInputChange}
          />{" "}
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={handleInputChange}
          />{" "}
          Other
        </label>
        {errors.gender && <div className={styles.error}>{errors.gender}</div>}
      </div>

      <div className={styles.field}>
        <label>Date of Birth</label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleInputChange}
        />
        {errors.dob && <div className={styles.error}>{errors.dob}</div>}
      </div>

      <div className={styles.field}>
        <label>Country</label>
        <select
          name="country"
          value={form.country}
          onChange={handleSelectChange}
        >
          <option value="">Select Country</option>
          <option value="VN">Vietnam</option>
          <option value="US">USA</option>
        </select>
        {errors.country && <div className={styles.error}>{errors.country}</div>}
      </div>

      <div className={styles.field}>
        <label>Hobbies</label>
        {["Reading", "Traveling", "Gaming"].map((hobby) => (
          <label key={hobby}>
            <input
              type="checkbox"
              name="hobbies"
              value={hobby}
              checked={form.hobbies.includes(hobby)}
              onChange={handleInputChange}
            />
            {hobby}
          </label>
        ))}
        {errors.hobbies && <div className={styles.error}>{errors.hobbies}</div>}
      </div>

      <div className={styles.field}>
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        {errors.profilePicture && (
          <div className={styles.error}>{errors.profilePicture}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleInputChange}
          maxLength={300}
        />
        <div className={styles.remaining}>Characters left: {bioCharsLeft}</div>
      </div>

      <button type="submit" className={styles.submit}>
        Register
      </button>
    </form>
  );
}
