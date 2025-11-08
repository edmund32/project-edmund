import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import { DarkMode } from "../../context/DarkMode";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import TableCart from "./TableCart";
import { getProducts } from "../../services/product.services";
import {
  useTotalPriceDispatch,
  useTotalPrice,
} from "../../context/totalPriceCon";
import { clearCart } from "../../redux/slices/cartSlice";

const CartPopup = ({ onClose }) => {
  const { isDarkMode } = useContext(DarkMode);
  const cart = useSelector((state) => state.cart?.data ?? []);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const totalDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();
  const [showConfirm, setShowConfirm] = useState(false);

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

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowConfirm(false);
  };

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
                onClearCart={() => setShowConfirm(true)}
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

        {/* Modal Konfirmasi Hapus Semua */}
        {showConfirm && (
          <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <div
              className={`p-6 rounded-xl shadow-lg w-72 ${
                isDarkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-900"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Confirm</h3>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="hover:opacity-70"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-sm mb-5">
                Are you sure you want to delete all items from the cart?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    isDarkMode
                      ? "bg-slate-700 hover:bg-slate-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearCart}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium text-white ${
                    isDarkMode
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Yes, delete all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartPopup;
