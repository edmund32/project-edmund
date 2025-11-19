import Button from "../Elements/Button";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { addToCart } from "../../redux/slices/cartSlice";
import { DarkMode } from "../../context/DarkMode";
import { Link } from "react-router-dom";
import { Star } from "lucide-react"; 

const ProductsCard = ({ children }) => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <div
      className={`w-full max-w-xs rounded-2xl overflow-hidden group transition-all duration-300
        ${
          isDarkMode
            ? "bg-slate-700 text-white shadow-md "
            : "bg-white text-gray-900 shadow-md  "
        }`}
    >
      {children}
    </div>
  );
};

/* Card Header */
const Header = ({ image }) => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <div className="relative w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center overflow-hidden transition-colors duration-300">
      <img
        src={image}
        alt="product"
        className={`w-full h-full object-contain p-4 sm:p-6 transform 
        transition-all duration-300 ease-out  
        ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
    </div>
  );
};

/* === Card Product Info (Category + Title + Desc + Rating) === */
const Body = ({ title, children, category, rating }) => {
  const { isDarkMode } = useContext(DarkMode);
  const rate = rating?.rate || 0;
  const count = rating?.count || 0;

  return (
    <div className="px-5 py-4 space-y-2">
      {/* Category */}
      {category && (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-300 ${
            isDarkMode
              ? "bg-indigo-900 text-indigo-200"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {category}
        </span>
      )}

      {/* Title */}
      <h5
        className={`text-base font-semibold line-clamp-1 tracking-wide ${
          isDarkMode ? "text-indigo-200" : "text-indigo-700"
        }`}
      >
        {title}
      </h5>

      {/* Description */}
      <p
        className={`text-sm line-clamp-2 leading-relaxed ${
          isDarkMode ? "text-indigo-50/80" : "text-gray-600"
        }`}
      >
        {children}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.round(rate)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-slate-500"
            }`}
          />
        ))}
        <span
          className={`text-xs font-medium ml-1 ${
            isDarkMode ? "text-indigo-200" : "text-gray-700"
          }`}
        >
          {rate.toFixed(1)} ({count})
        </span>
      </div>
    </div>
  );
};

/* === Card Product Footer (Price + Buttons) === */
const Footer = ({ price, id }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useContext(DarkMode);

  return (
    <div className="flex items-center justify-between px-5 pb-5 mt-auto">
      <span
        className={`text-lg font-bold ${
          isDarkMode ? "text-indigo-300" : "text-indigo-700"
        }`}
      >
        ${price.toFixed(2)}
      </span>

      <div className="flex gap-2">
        <Link to={`/products/${id}`}>
          <Button
            variant={{
              bg: isDarkMode ? "bg-slate-800" : "bg-slate-200",
              text: isDarkMode ? "text-slate-200" : "text-slate-700",
              hoverBg: isDarkMode ? "hover:bg-slate-900" : "hover:bg-slate-300",
              hoverText: isDarkMode ? "hover:text-white" : "hover:text-slate-700",
            }}
            className="text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95"
          >
            Detail
          </Button>
        </Link>

        <Button
          variant={{
            bg: isDarkMode ? "bg-indigo-500" : "bg-indigo-600",
            text: "text-white",
            hoverBg: isDarkMode ? "hover:bg-indigo-700" : "hover:bg-indigo-800",
            hoverText: "hover:text-white",
          }}
          className="text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
          onClick={() => {
            dispatch(addToCart({ id, qty: 1 }));
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

/* === Product Detail Header === */
const DetailHeader = ({ image }) => (
  <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
    <img
      src={image}
      alt="product"
      className="rounded-xl object-contain max-h-96 transition-transform duration-300 hover:scale-105"
    />
  </div>
);

/* === Product Detail Body === */
const DetailBody = ({ title, children }) => (
  <div className="flex flex-col justify-center">
    <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
      {title}
    </h2>
    <p className="text-gray-700 dark:text-gray-200 text-md leading-relaxed">
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
