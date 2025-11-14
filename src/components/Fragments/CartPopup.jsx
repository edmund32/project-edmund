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
import ConfirmationPopup from "./ConfirmationPopup";

const CartPopup = ({ onClose }) => {
  const { isDarkMode } = useContext(DarkMode);
  const cart = useSelector((state) => state.cart?.data ?? []);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const totalDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();
  const [showPopup, setShowPopup] = useState(false); // state buat popup

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
        const product = products.find((p) => p.id === item.id);
        if (!product) return acc;
        return acc + product.price * item.qty;
      }, 0);
      totalDispatch({ type: "UPDATE", payload: { total } });
    } else {
      totalDispatch({ type: "UPDATE", payload: { total: 0 } });
    }
  }, [cart, products]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`relative w-[95%] sm:w-[700px] 
         max-h-[93vh] sm:max-h-[88vh] 
         overflow-y-auto rounded-2xl p-6 sm:p-8 
          shadow-xl transition-all duration-300 mx-4 sm:mx-0 ${
            isDarkMode
              ? "bg-slate-800 text-indigo-200"
              : "bg-white text-slate-800"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-500 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-indigo-500 flex items-center gap-2">
          🛒 Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-10">Your cart is empty.</p>
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
              <span className="text-lg font-semibold">Total Price:&nbsp;</span>
              <span className="text-xl font-bold text-indigo-500">
                ${total.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {/* Popup COnfirmation */}
        <ConfirmationPopup
          show={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={confirmClearCart}
          message="Are you sure you want to delete all items from the cart?"
          confirmText="Yes, delete all"
          cancelText="Cancel"
        />
      </div>
    </div>,
    document.body
  );
};

export default CartPopup;
