import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateUser, deleteUser } from "../services/auth.services";
import { passwordValidation } from "../components/Fragments/Validation/validation";
import InputForm from "../components/Elements/Input";
import Button from "../components/Elements/Button";
import { DarkMode } from "../context/DarkMode";
import { useNotification } from "../context/NotificationCon";

const ProfilePage = () => {
  const { username, isAuthChecked } = useAuth();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkMode);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (isAuthChecked && username) reset({ username });
  }, [isAuthChecked, username, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser(userId, data);
      showNotification("Profile berhasil di-update!", "success");
      navigate("/products");
    } catch (err) {
      console.error(err);
      showNotification("Gagal melakukan update profile", "error");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(userId);
        localStorage.clear();
        showNotification("Akun berhasil dihapus!", "success");
        navigate("/login");
      } catch (err) {
        console.error(err);
        showNotification("Gagal menghapus akun...", "error");
      }
    }
  };

  if (!isAuthChecked) return <p>Loading user data...</p>;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-8 ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-900 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <img
        src="/image/graphic-2.webp"
        alt="Illustration"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/40 backdrop-blur-[1.5px]" />

      <div
        className={`relative w-full max-w-md sm:max-w-lg lg:max-w-xl backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 border ${
          isDarkMode
            ? "bg-slate-900/60 border-slate-700"
            : "bg-slate-100 border-gray-200 text-black"
        }`}
      >
        <h1
          className={`text-2xl sm:text-3xl font-extrabold text-center mb-2 ${
            isDarkMode ? "text-indigo-400" : "text-indigo-700"
          }`}
        >
          Profile Settings
        </h1>
        <p
          className={`text-xs sm:text-sm text-center mb-6 sm:mb-8 ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Update or delete your username or password below
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          <InputForm
            label="Change Username"
            name="username"
            type="text"
            placeholder="Enter new username..."
            {...register("username", { required: "Username is required" })}
            error={errors.username?.message}
          />

          <InputForm
            label="Change Password"
            name="password"
            type="password"
            placeholder="Enter new password..."
            {...register("password", passwordValidation)}
            error={errors.password?.message}
          />

          <div className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              variant={{
                bg: isDarkMode ? "bg-indigo-400" : "bg-indigo-700",
                text: "text-white",
                hoverBg: "hover:bg-indigo-700",
                hoverText: "",
              }}
              className="w-full h-12 font-semibold"
            >
              Save Changes
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              variant={{
                bg: isDarkMode ? "bg-red-700" : "bg-red-600",
                text: "text-white",
                hoverBg: "hover:bg-red-900",
                hoverText: "",
              }}
              className="w-full h-12 font-semibold"
            >
              Delete Account
            </Button>
          </div>
        </form>
      </div>

      <p className="text-xs sm:text-sm text-slate-200 mt-6 sm:mt-10 relative">
        Back to{" "}
        <span
          className={`cursor-pointer ${
            isDarkMode
              ? "text-indigo-400 font-semibold hover:text-indigo-600 transition-colors duration-300"
              : "text-indigo-800 font-semibold hover:text-indigo-600 transition-colors duration-300"
          }`}
        >
          <Link to="/">Home</Link>
        </span>
      </p>
    </div>
  );
};

export default ProfilePage;
//test