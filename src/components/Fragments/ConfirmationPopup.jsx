import { useContext } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DarkMode } from "../../context/DarkMode";
import Button from "../Elements/Button";

const ConfirmationPopup = ({
  show,
  onClose,
  onConfirm,
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-[2px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`p-6 rounded-xl shadow-lg w-72 ${
              isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Confirm</h3>
              <button
                onClick={onClose}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message */}
            <p className="text-sm mb-5">{message}</p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                onClick={onClose}
                variant={{
                  bg: isDarkMode ? "bg-slate-700" : "bg-gray-200",
                  text: isDarkMode ? "text-white" : "text-slate-900",
                  hoverBg: isDarkMode
                    ? "hover:bg-slate-600"
                    : "hover:bg-gray-300",
                  hoverText: "",
                }}
                className="px-3 py-1.5 text-sm font-medium"
              >
                {cancelText}
              </Button>

              <Button
                onClick={onConfirm}
                variant={{
                  bg: isDarkMode ? "bg-red-500" : "bg-red-600",
                  text: "text-white",
                  hoverBg: isDarkMode
                    ? "hover:bg-red-600"
                    : "hover:bg-red-700",
                  hoverText: "",
                }}
                className="px-3 py-1.5 text-sm font-medium"
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationPopup;
