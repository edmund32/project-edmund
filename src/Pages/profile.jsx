// Pages/profile.jsx
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateUser, deleteUser } from "../services/auth.services";
import {
  passwordValidation,
  usernameValidation,
  updateValidation,
} from "../components/Fragments/Validation/validation";
import InputForm from "../components/Elements/Input";
import Button from "../components/Elements/Button";
import { DarkMode } from "../context/DarkMode";
import { useNotification } from "../context/NotificationCon";
import ConfirmationPopup from "../components/Fragments/ConfirmationPopup";

const ProfilePage = () => {
  const { username, setUsername, isAuthChecked } = useAuth();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkMode);
  const { showNotification } = useNotification();
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (isAuthChecked && username) reset({ username });
  }, [isAuthChecked, username, reset]);

  const onSubmit = async (data) => {
    const currentUsername = localStorage.getItem("username");
    const currentPassword = localStorage.getItem("password");

    // Custom validation
    const errorVal = updateValidation(data, currentUsername, currentPassword);
    if (Object.keys(errorVal).length > 0) {
      if (errorVal.username)
        setError("username", { message: errorVal.username });
      if (errorVal.password)
        setError("password", { message: errorVal.password });
      if (errorVal.general) showNotification(errorVal.general, "error");
      return;
    }

    setFormData(data);
    setShowUpdatePopup(true);
  };

  const handleUpdateConfirm = async () => {
    try {
      const updatedUser = await updateUser(userId, formData);

      if (updatedUser.username) {
        localStorage.setItem("username", updatedUser.username);
        setUsername(updatedUser.username);
      }

      if (updatedUser.password) {
        localStorage.setItem("password", updatedUser.password);
      }

      showNotification("Profil berhasil di-update!", "success");
      setShowUpdatePopup(false);
      navigate("/products");
    } catch (err) {
      console.error(err);
      showNotification("Profile gagal di-update...", "error");
    }
  };

  const handleDelete = async () => {
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userId);
      localStorage.clear();
      showNotification("Akun berhasil dihapus!", "success");
      navigate("/login");
    } catch (err) {
      console.error(err);
      showNotification("Gagal menghapus akun...", "error");
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
            {...register("username", usernameValidation)}
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
                hoverBg: "hover:bg-indigo-50",
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
                hoverText: "text-slate-100",
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
        <Link
          to="/"
          className={`cursor-pointer ${
            isDarkMode
              ? "text-indigo-400 font-semibold hover:text-indigo-600 transition-colors duration-300"
              : "text-indigo-800 font-semibold hover:text-indigo-600 transition-colors duration-300"
          }`}
        >
          Home
        </Link>
      </p>

      <ConfirmationPopup
        show={showUpdatePopup}
        onClose={() => setShowUpdatePopup(false)}
        onConfirm={handleUpdateConfirm}
        message="Apakah kamu yakin ingin menyimpan perubahan pada profil?"
        confirmText="Yes, save changes"
        cancelText="Cancel"
      />

      <ConfirmationPopup
        show={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
        message="Apakah kamu yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Yes, delete account"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ProfilePage;
