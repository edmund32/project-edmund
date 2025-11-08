import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { Sun, Moon } from "lucide-react";

const Auth = ({ children, title, type }) => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-gray-900"
      }`}
    >
      {/* Background Gambar */}
      <img
        src="/image/graphic-2.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay efek glass */}
      <div
        className={`absolute inset-0 backdrop-blur-xs transition-all duration-500 ${
          isDarkMode ? "bg-slate-900/70" : "bg-slate-600/60"
        }`}
      />

      {/* Form Container */}
      <div
        className={`relative z-10 w-[90%] max-w-md rounded-2xl p-8 shadow-2xl border transition-all duration-500 ${
          isDarkMode
            ? "bg-slate-800/80 border-slate-700"
            : "bg-white/80 border-gray-200 backdrop-blur-md"
        }`}
      >
        {/* Header: Title + Tombol Dark Mode */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              isDarkMode ? "text-indigo-400" : "text-indigo-700"
            }`}
          >
            {title}
          </h1>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-700 hover:bg-slate-600 text-yellow-400"
                : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <p
          className={`mb-8 text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
            isDarkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {type === "register"
            ? "Hello! Please enter your details to register."
            : "Hello! Please enter your details to continue."}
        </p>

        {/* Form Content */}
        {children}

        {/* Link to Login/Register */}
        {type !== "profile" && (
          <p
            className={`flex justify-center text-sm pt-6 flex-wrap text-center ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {type === "login" ? (
              <>
                Don’t have an account?
                <Link
                  to="/register"
                  className={`ml-1 font-semibold underline hover:opacity-80 transition-colors duration-300 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-700"
                  }`}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?
                <Link
                  to="/login"
                  className={`ml-1 font-semibold underline hover:opacity-80 transition-colors duration-300 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-700"
                  }`}
                >
                  Login
                </Link>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
