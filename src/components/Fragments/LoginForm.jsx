import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { login } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { useNotification } from "../../context/NotificationCon";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({
    mode: "onChange", //real-time validation
  });

  const { isDarkMode } = useContext(DarkMode);

  const navigate = useNavigate();

  const { showNotification } = useNotification();

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = async (data) => {
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        showNotification("Login berhasil!", "success");
        navigate("/products");
        
      } else {
        showNotification(
          "Login gagal!",
          "error"
        );

        setError("username", {
          type: "manual",
          message: "Username atau password salah, silahkan coba lagi.",
        });
        setError("password", {
          type: "manual",
          message: "Username atau password salah, silahkan coba lagi.",
        });
      }
    });
  };

  const loginError =
    errors.username?.type === "manual" || errors.password?.type === "manual"
      ? "Username atau password salah, silahkan coba lagi."
      : null;

  return (
    <div className="w-full max-w-sm m-auto">

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <InputForm
          label="Username"
          name="username"
          type="username"
          placeholder="Insert your username..."
          {...register("username", {
            required: "Username wajib diisi",
          })}
          error={errors.username?.message}
        />

        {/* Password */}
        <InputForm
          label="Password"
          name="password"
          type="password"
          placeholder="Type your password here..."
          {...register("password", {
            required: "Password wajib diisi",
          })}
          error={errors.password?.message}
        />

        {loginError && <p className="text-sm text-red-500">{loginError}</p>}

        <div className="flex pt-4 justify-center">
          <Button
            variant={{
              bg: isDarkMode ? "bg-indigo-400" : "bg-indigo-700",
              text: "text-white",
              hoverBg: isDarkMode ? "hover:bg-slate-200" : "hover:bg-indigo-800",
              hoverText: isDarkMode ? "hover:text-indigo-700" : "hover:text-slate-300",
            }}
            className="w-35 h-12 w-full"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
