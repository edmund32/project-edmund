import { useSelector, useDispatch } from "react-redux";
import {
  useTotalPrice,
  useTotalPriceDispatch,
} from "../../context/totalPriceCon";
import { useEffect, useRef, useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { Trash2 } from "lucide-react";
import { removeFromCart } from "../../redux/slices/cartSlice";

const TableCart = ({ products = [], onClearCart }) => {
  const cart = useSelector((state) => state.cart?.data ?? []);
  const dispatch = useDispatch();
  const totalDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();
  const { isDarkMode } = useContext(DarkMode);
  const totalPriceRef = useRef(null);

  // 🔹 Hitung total harga setiap kali cart berubah
  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((p) => String(p.id) === String(item.id));
        if (!product) return acc;
        return acc + (product.price || 0) * item.qty;
      }, 0);
      totalDispatch({ type: "UPDATE", payload: { total: sum } });
    } else {
      totalDispatch({ type: "UPDATE", payload: { total: 0 } });
    }
  }, [cart, products]);

  useEffect(() => {
    if (!totalPriceRef.current) return;
    totalPriceRef.current.style.display = cart.length > 0 ? "block" : "none";
  }, [cart]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`overflow-hidden border rounded-lg relative shadow transition-all duration-300 ${
        isDarkMode ? "border-slate-700" : "border-gray-300"
      }`}
    >
      {/* 🔹 Tombol Hapus Semua */}
      {cart.length > 0 && (
        <div
          className={`flex justify-end py-1 pr-2 border-b ${
            isDarkMode
              ? "border-slate-700 bg-slate-800"
              : "border-gray-200 bg-gray-100"
          }`}
        >
          <button
            onClick={onClearCart}
            className={`flex items-center gap-1 text-xs font-medium rounded-md px-3 py-1 transition-colors duration-200 ${
              isDarkMode
                ? "text-red-400 hover:bg-slate-700"
                : "text-red-600 bg-gray-100 hover:bg-red-100"
            }`}
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      )}

      {/* 🔹 Scrollable Table */}
      <div className="max-h-64 overflow-y-auto scroll-container">
        <table className="text-left table-auto w-full border-collapse">
          <thead>
            <tr
              className={`sticky top-0 bg-opacity-90 backdrop-blur-md ${
                isDarkMode
                  ? "text-indigo-300 bg-slate-900"
                  : "text-slate-900 bg-slate-200 border-gray-300"
              }`}
            >
              <th className="py-2 px-4">Product</th>
              <th className="px-2">Price</th>
              <th className="px-2">Qty</th>
              <th className="px-2">Total</th>
              <th className="px-2 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => {
                const product = products.find(
                  (p) => String(p.id) === String(item.id)
                );
                if (!product) return null;

                return (
                  <tr
                    key={item.id}
                    className={`border-t ${
                      isDarkMode
                        ? "border-slate-700 hover:bg-slate-700/40"
                        : "border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <td className="py-2 px-4 truncate">
                      {product.title
                        ? `${product.title.substring(0, 30)}...`
                        : "Unknown"}
                    </td>
                    <td className="px-2">${product.price.toFixed(2)}</td>
                    <td className="px-2">{item.qty}</td>
                    <td className="px-2">
                      ${(product.price * item.qty).toFixed(2)}
                    </td>
                    <td className="px-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className={`p-1 rounded-md ${
                          isDarkMode
                            ? "hover:bg-slate-600 text-red-400"
                            : "hover:bg-red-100 text-red-600"
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className={`text-center py-4 ${
                    isDarkMode ? "text-indigo-50" : "text-slate-900"
                  }`}
                >
                  No items in cart
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCart;
