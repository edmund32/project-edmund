import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { registerUser } from "../../services/auth.services";
import { passwordValidation, usernameValidation } from "./Validation/validation";
import { DarkMode } from "../../context/DarkMode";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationCon";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange", //real-time validation
  });

  const password = watch("password");
  const { isDarkMode } = useContext(DarkMode);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    setFocus("fullname");
  }, [setFocus]);

  const onSubmit = async (data) => {
    const { success, error } = await registerUser({
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (success) {
      showNotification("Registrasi berhasil!", "success");
      navigate("/login");
    } else {
      showNotification("Registrasi gagal...", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label="Fullname"
        name="fullname"
        type="text"
        placeholder="Insert your fullname..."
        {...register("fullname", { required: "Nama lengkap wajib diisi" })}
        error={errors.fullname?.message}
        compact
      />

      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="Insert your username..."
        {...register("username", {
          required: "Username wajib diisi",
          ...usernameValidation,
          onChange: (e) => {
            e.target.value = e.target.value.toLowerCase().replace(/\s/g, "");
          },
        })}
        error={errors.username?.message}
        compact
      />

      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
        {...register("email", {
          required: "Email wajib diisi",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: "Format email tidak valid",
          },
        })}
        error={errors.email?.message} // 🔹 error muncul langsung saat mengetik
        compact
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="Type your password here..."
        {...register("password", passwordValidation)}
        error={errors.password?.message}
      />

      <div className="flex flex-col items-center pt-2 sm:pt-4">
        <Button
          variant={{
            bg: isDarkMode ? "bg-indigo-400" : "bg-indigo-700",
            text: "text-white text-sm sm:text-base",
            hoverBg: "hover:bg-slate-200",
            hoverText: "hover:text-indigo-700",
          }}
          className="w-35 h-9 sm:h-12 w-full"
          type="submit"
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
