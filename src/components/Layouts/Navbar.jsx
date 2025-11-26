import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationCon";
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react";
import CartPopup from "../Fragments/CartPopup";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { username, handleLogout } = useAuth();
  const { showNotification } = useNotification();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data ?? []);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const [showCart, setShowCart] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [cart]);

  // Click outside → close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onLogout = () => {
    handleLogout();
    dispatch(clearCart());
    showNotification("Anda berhasil logout.");
    setIsDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`sticky top-0 w-full z-50 backdrop-blur-md shadow 
        ${
          isDarkMode
            ? "bg-slate-800/80 text-white"
            : "bg-indigo-600/90 text-slate-50"
        }`}
      >
        <div className="h-12 sm:h-15 flex items-center justify-between px-4 sm:px-6">
          {/* LOGO */}
          <h1
            className="text-xl sm:text-2xl font-bold cursor-pointer tracking-wide"
            onClick={() => navigate("/products")}
          >
            E-Commerce
          </h1>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* DARK MODE TOGGLE */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300
                ${
                  isDarkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-yellow-300"
                    : "bg-gray-200 hover:bg-slate-300 text-indigo-600"
                }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CART BUTTON */}
            <button
              onClick={() => setShowCart(true)}
              className="relative hover:opacity-80 transition-all"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center 
                    ${isBouncing ? "animate-bounce" : ""}`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {showCart && <CartPopup onClose={() => setShowCart(false)} />}

            {/* DESKTOP DROPDOWN */}
            <div ref={dropdownRef} className="relative hidden sm:block">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all
                  ${
                    isDarkMode
                      ? "hover:bg-slate-700 text-white"
                      : "hover:bg-indigo-400 text-gray-50"
                  }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${
                    isDarkMode
                      ? "bg-indigo-500"
                      : "bg-indigo-200 text-indigo-900"
                  }`}
                >
                  {username?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold">{username || "User"}</span>
              </button>

              {/* DROPDOWN MENU */}
              <div
                className={`
                  absolute right-0 mt-1 w-40 rounded-lg shadow-lg border transition-all duration-200 origin-top
                  ${
                    isDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                  ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }
                `}
              >
                {/* ITEM */}
                <button
                  onClick={() => navigate("/profile")}
                  className={`
                    w-full px-4 py-2 text-left rounded-t-lg 
                    transition-all
                    ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"}
                  `}
                >
                  Profile
                </button>

                <button
                  onClick={onLogout}
                  className={`
                    w-full px-4 py-2 text-left rounded-b-lg
                    text-red-500 
                    transition-all
                    ${isDarkMode ? "hover:bg-red-900" : "hover:bg-red-100"}
                  `}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* HAMBURGER MOBILE */}
            <button
              className="block sm:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 shadow-xl transition-transform duration-300 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"}
        `}
        >
        {/* HEADER */}
        <div
          className={`flex items-center justify-between p-4 border-b 
            ${isDarkMode ? "border-slate-700" : "border-gray-200"}
          `}
        >
          <h2 className="text-lg font-semibold tracking-wide">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800/40 dark:hover:bg-slate-700/40 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          {/* AVATAR + USER */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow 
                ${isDarkMode ? "bg-indigo-600" : "bg-indigo-300 text-indigo-900"}
              `}
            >
              {username?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-lg">{username}</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div
            className={`h-px mb-6 
              ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}
            `}
          />

          {/* MENU ITEMS */}
          <button
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
            className={`
              w-full px-4 py-3 border-b border-gray-700 text-left mb-2 font-medium transition
              ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}
            `}
          >
            Profile
          </button>

          <button
            onClick={onLogout}
            className={`
              w-full px-4 py-3 text-left rounded-lg font-medium transition
              text-red-500
              ${isDarkMode ? "hover:bg-red-900" : "hover:bg-red-100"}
            `}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
