import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getDetailProduct } from "../services/product.services";
import { DarkMode } from "../context/DarkMode";
import Navbar from "../components/Layouts/Navbar";
import { Star } from "lucide-react";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(DarkMode);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getDetailProduct(id, (data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-500">
        <p>Produk tidak ditemukan.</p>
        <Link
          to="/products"
          className="mt-4 text-indigo-500 hover:text-indigo-700 underline"
        >
          Kembali ke Produk
        </Link>
      </div>
    );

  // rating
  const rating = product.rating?.rate || 0;
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      className={`${
        i < Math.round(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-400"
      }`}
    />
  ));

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800"
      }`}
    >
      <Navbar />

      <div
        className={`min-h-screen  py-10 sm:py-16 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white"
            : "bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Image Section */}
          <div className="w-full flex justify-center items-center">
            <div
              className={`w-full h-full rounded-3xl shadow-lg border p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center transition-all duration-300
              ${
                isDarkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-gray-200 bg-white"
              }
            `}
            >
              <img
                src={product.image}
                alt={product.title}
                className=" object-contain w-full max-w-[500px] max-h-[220px] sm:max-h-[280px] md:max-h-[420px] lg:max-h-[400px]"
              />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="space-y-4 sm:space-y-5">
            {/* Category Badge */}
            <span
              className={`px-4 py-1 rounded-full text-xs sm:text-sm font-medium w-fit transition-all duration-300 ${
                isDarkMode
                  ? "bg-indigo-900 text-indigo-200"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {product.category.toUpperCase()}
            </span>

            {/* Title */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-snug ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center">
              {stars}
              <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <p className={`text-2xl sm:text-3xl font-semibold ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p
              className={`leading-relaxed text-sm sm:text-base ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {product.description}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center gap-1 mt-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className={`px-4 py-2 rounded-full border transition-colors duration-300 ${
                  isDarkMode
                    ? "border-slate-700 hover:bg-slate-700"
                    : "border-gray-300 hover:bg-slate-300"
                }`}
              >
                -
              </button>

              <span className="text-lg font-semibold w-8 text-center">
                {qty}
              </span>

              <button
                onClick={() => setQty((q) => Math.max(1, q + 1))}
                className={`px-4 py-2 rounded-full border transition-colors duration-300 ${
                  isDarkMode
                    ? "border-slate-700 hover:bg-slate-700"
                    : "border-gray-300 hover:bg-slate-300"
                }`}
              >
                +
              </button>
            </div>

            {/* Add & Back Buttons */}
            <div className="flex flex-col gap-4">
              <button
                className={`w-full py-4 text-white text-lg font-medium rounded-full transition-all 
                  ${isDarkMode 
                    ? "bg-indigo-400 hover:bg-indigo-500" 
                    : "bg-indigo-600 hover:bg-indigo-700"
                  } `}
                onClick={() => dispatch(addToCart({ id, qty }))}
              >
                Add to Cart
              </button>

              <Link
                to="/products"
                className={`block text-center underline text-sm transition-all duration-300
                  ${isDarkMode 
                    ? "text-indigo-400 hover:text-indigo-300" 
                    : "text-indigo-500 hover:text-indigo-700" 
                  }`}
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
