import { useContext } from "react";
import { usePopupAlertStore } from "../../zustand/usePopupAlertStore";
import { DarkMode } from "../../context/DarkMode";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const PopupAlert = () => {
  const { isOpen, message, closePopup } = usePopupAlertStore();
  const { isDarkMode } = useContext(DarkMode);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-[90%] max-w-[600px] p-6 md:p-10 rounded-xl shadow-2xl border
          ${
            isDarkMode
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-slate-200 text-slate-800"
          }
        `}
          >
            {/* Text */}
            <p className="text-center text-xl md:text-3xl font-bold mb-6">
              {message}
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={closePopup}
                className={`w-full md:w-1/2 py-3 rounded-lg transition-all duration-300
              ${
                isDarkMode
                  ? "bg-indigo-400 text-white hover:bg-indigo-500 active:scale-95"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95"
              }
            `}
              >
                Oke
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PopupAlert;
