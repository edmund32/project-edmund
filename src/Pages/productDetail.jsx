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

  // ambil rating dari product.rating?.rate
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-10 items-center">
        {/* Gambar */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div
            className={`rounded-2xl shadow-xl p-6 ${
              isDarkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-72 sm:h-96 object-contain"
            />
          </div>
        </div>

        {/* Detail */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {product.title}
          </h1>

          <div className="flex items-center text-yellow-400 text-lg">
            {stars}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({rating}/5)
            </span>
          </div>

          <p
            className={`text-md leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {product.description}
          </p>

          <p
            className={`text-2xl font-semibold  ${
              isDarkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            ${product.price}
          </p>

          <p className="italic text-sm text-gray-500 dark:text-gray-400">
            Category: {product.category}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300"
              onClick={() => dispatch(addToCart({ id, qty: 1 }))}
            >
              Add to Cart
            </button>
            <Link
              to="/products"
              className="w-full sm:w-auto px-6 py-3 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-medium rounded-lg transition-all duration-300 text-center"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
