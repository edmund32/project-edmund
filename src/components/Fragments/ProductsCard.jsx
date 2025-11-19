import Button from "../Elements/Button";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { addToCart } from "../../redux/slices/cartSlice";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; 

const ProductsCard = ({ children, id }) => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <Link
      to={`/products/${id}`}
      className="block group w-full"
    >
      <div
        className={`
          rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer w-full
          ${isDarkMode
            ? "bg-slate-700 text-white shadow-md group-hover:shadow-xl md:group-hover:-translate-y-1"
            : "bg-white text-gray-900 shadow-md group-hover:shadow-xl md:group-hover:-translate-y-1"
          }
        `}
      >
        {children}
      </div>
    </Link>
  );
};

/* ===== HEADER ===== */
const Header = ({ image }) => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <div
      className={`relative w-full
        h-40 sm:h-48 md:h-56 lg:h-64 /* mobile height smaller */
        flex items-center justify-center overflow-hidden`}
    >
      <img
        src={image}
        alt="product"
        className={`
          w-full h-full object-contain
          p-3 sm:p-4 md:p-6 /* more padding on large screens */
          transition-all duration-300
          ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}
        `}
      />
    </div>
  );
};

/* ===== BODY ===== */
const Body = ({ title, children, category, rating }) => {
  const { isDarkMode } = useContext(DarkMode);
  const rate = rating?.rate || 0;
  const count = rating?.count || 0;

  return (
    <div className="px-4 py-3 sm:px-5 sm:py-4 space-y-2">
      {/* Category */}
      {category && (
        <span
          className={`
            text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full
            ${isDarkMode
              ? "bg-indigo-900 text-indigo-200"
              : "bg-indigo-100 text-indigo-700"
            }
          `}
        >
          {category}
        </span>
      )}

      {/* Title */}
      <h5
        className={`text-sm sm:text-base font-semibold line-clamp-1 ${
          isDarkMode ? "text-indigo-200" : "text-indigo-700"
        }`}
      >
        {title}
      </h5>

      {/* Description */}
      <p
        className={`text-xs sm:text-sm line-clamp-2 ${
          isDarkMode ? "text-indigo-50/80" : "text-gray-600"
        }`}
      >
        {children}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1 sm:mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14} /* smaller in mobile */
            className={`${
              i < Math.round(rate)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-slate-500"
            }`}
          />
        ))}
        <span
          className={`text-[10px] sm:text-xs ml-1 ${
            isDarkMode ? "text-indigo-200" : "text-gray-700"
          }`}
        >
          {rate.toFixed(1)} ({count})
        </span>
      </div>
    </div>
  );
};

/* ===== FOOTER ===== */
const Footer = ({ price, id }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(DarkMode);

  return (
    <div className="flex items-center justify-between px-4 sm:px-5 pb-4 sm:pb-5">
      <span
        className={`text-base sm:text-lg font-bold ${
          isDarkMode ? "text-indigo-300" : "text-indigo-700"
        }`}
      >
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

/* ===== DETAIL HEADER ===== */
const DetailHeader = ({ image }) => (
  <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl p-3 sm:p-4">
    <img
      src={image}
      alt="product"
      className="rounded-xl object-contain max-h-72 sm:max-h-96 transition-transform duration-300 hover:scale-105"
    />
  </div>
);

/* ===== DETAIL BODY ===== */
const DetailBody = ({ title, children }) => (
  <div className="flex flex-col justify-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 sm:mb-4">
      {title}
    </h2>
    <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-md leading-relaxed">
      {children}
    </p>
  </div>
);

ProductsCard.Header = Header;
ProductsCard.Body = Body;
ProductsCard.Footer = Footer;
ProductsCard.DetailHeader = DetailHeader;
ProductsCard.DetailBody = DetailBody;

export { ProductsCard };
