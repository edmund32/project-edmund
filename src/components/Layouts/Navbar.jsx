import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationCon";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import CartPopup from "../Fragments/CartPopup";
import { useSelector,useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { username, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { showNotification } = useNotification();
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart.data ?? []);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const [isBouncing, setIsBouncing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (totalItems === 0) return;
    setIsBouncing(true);
    const timeout = setTimeout(() => setIsBouncing(false), 600);
    return () => clearTimeout(timeout);
  }, [cart]);

  const handleLogoutClick = () => {
    handleLogout();
    dispatch(clearCart())
    setIsOpen(false);
    showNotification("Anda berhasil logout.");
  };

  return (
    <nav
      className={`sticky z-50 top-0 w-full backdrop-blur-md shadow 
      ${
        isDarkMode
          ? "bg-slate-800/80 text-white"
          : "bg-indigo-700/90 text-white"
      }`}
    >
      {/* Main Container */}
      <div className="flex justify-between items-center h-16 px-4 sm:px-8">
        {/* Left: Logo / Brand */}
        <h1
          className="text-xl sm:text-2xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/products")}
        >
          E-Commerce
        </h1>

        {/* Controls */}
        <div className="flex items-center gap-3 sm:gap-5 relative">
          {/* Tombol Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="relative text-gray-100 hover:text-indigo-300 cursor-pointer transition-all duration-300"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center ${
                  isBouncing ? "animate-bounce" : ""
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>

          {showCart && <CartPopup onClose={() => setShowCart(false)} />}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-700 hover:bg-slate-600 text-yellow-400"
                : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
            }`}
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm sm:text-md font-medium
              ${
                isDarkMode
                  ? "bg-slate-700 text-slate-50 hover:bg-slate-600"
                  : "bg-slate-50 text-indigo-700 hover:bg-slate-200"
              } transition-colors duration-300 cursor-pointer`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-full font-bold
                ${
                  isDarkMode
                    ? "bg-indigo-500 text-white"
                    : "bg-indigo-200 text-indigo-900"
                }`}
              >
                {username?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* Username: tampil di layar sedang ke atas */}
              <span className="hidden sm:inline">{username || "User"}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className={`absolute right-0 mt-2 w-36 sm:w-40 rounded-lg shadow-lg border z-50 
                ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? "hover:bg-slate-700 text-slate-200"
                      : "hover:bg-gray-100 text-slate-800"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={handleLogoutClick}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode
                      ? "hover:bg-slate-700 text-red-400"
                      : "hover:bg-gray-100 text-red-600"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
