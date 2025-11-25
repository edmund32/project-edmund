import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../context/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import TableCart from "./tableCart";
import { getProducts } from "../../services/product.services";
import {
  useTotalPriceDispatch,
  useTotalPrice,
} from "../../context/totalPriceCon";
import { clearCart } from "../../redux/slices/cartSlice";
import ConfirmationPopup from "../Global/ConfirmationPopup";
import { motion, AnimatePresence } from "framer-motion";

const CartPopup = ({ onClose }) => {
  const { isDarkMode } = useContext(DarkMode);
  const cart = useSelector((state) => state.cart?.data ?? []);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const totalDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();

  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 200);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const total = cart.reduce((acc, item) => {
        const product = products.find((p) => String(p.id) === String(item.id));
        if (!product) return acc;
        return acc + product.price * item.qty;
      }, 0);
      totalDispatch({ type: "UPDATE", payload: { total } });
    } else {
      totalDispatch({ type: "UPDATE", payload: { total: 0 } });
    }
  }, [cart, products]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="overlay"
          className={`fixed inset-0 z-50 flex justify-center items-center 
          backdrop-blur-xs 
          ${isDarkMode ? "bg-black/60" : "bg-black/40"}`}
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            key="card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-[95%] sm:w-[700px] max-h-[93vh]
            overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-xl
            transition-colors duration-200
            ${
              isDarkMode
                ? "bg-slate-800 text-indigo-200 border border-slate-700"
                : "bg-white text-slate-800 border border-gray-200"
            }`}
          >
            {/* Tombol Close */}
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-md md:text-xl font-bold flex items-center gap-2
                  ${isDarkMode ? "text-indigo-300" : "text-indigo-500"}`}
              >
                🛒 Cart
              </h2>

              <button
                onClick={handleClose}
                className={`transition
                  ${
                    isDarkMode
                      ? "text-gray-400 hover:text-indigo-300"
                      : "text-gray-500 hover:text-indigo-500"
                  }`}
              >
                <X size={22} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="max-h-[55vh] overflow-y-auto pr-1 overflow-x-auto">
                  <TableCart
                    products={products}
                    onClearCart={() => setShowPopup(true)}
                  />
                </div>

                <div
                  className={`pt-4 text-right ${
                    isDarkMode ? "border-slate-700" : "border-gray-200"
                  }`}
                >
                  <span className="text-lg font-semibold">
                    Total Price:&nbsp;
                  </span>
                  <span className="text-xl font-bold text-indigo-500">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </>
            )}

            {/* Popup Confirmation */}
            <ConfirmationPopup
              show={showPopup}
              onClose={() => setShowPopup(false)}
              onConfirm={confirmClearCart}
              message="Are you sure you want to delete all items from the cart?"
              confirmText="Yes, delete all"
              cancelText="Cancel"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CartPopup;
