import { useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { DarkMode } from "../context/DarkMode";
import Navbar from "../components/Layouts/Navbar";
import { ProductsCard } from "../components/Fragments/ProductsCard";
import { getProducts } from "../services/product.services";
import { Filter } from "lucide-react";
import Input from "../components/Elements/Input/Input";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { isDarkMode } = useContext(DarkMode);
  const { isAuthChecked } = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setProducts(data);
      setFiltered(data);

      const uniqueCategories = ["all", ...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    };
    loadData();
  }, []);

  // Handle search
  useEffect(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
    }
    setFiltered(result);
  }, [search, products, category]);

  if (!isAuthChecked) return null;

  const CategoryDropdown = ({
    categories,
    category,
    setCategory,
    isDarkMode,
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative w-12 sm:w-48">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-2 rounded-lg shadow flex justify-between items-center cursor-pointer 
                      transition-colors duration-300
                      ${
                        isDarkMode
                          ? "bg-slate-800 text-white hover:bg-slate-700"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
        >
          {/* Text hanya muncul di layar sm ke atas */}
          <span className="capitalize hidden sm:block">{category}</span>

          {/* Icon filter */}
          <Filter
            size={20}
            className={`transition-transform duration-300 my-1.25 ${
              open ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown items */}
        <ul
          className={`absolute right-0
                      z-20 min-w-full sm:w-full max-h-100 overflow-auto 
                      rounded-lg border shadow-md transition-all duration-300 origin-top 
        ${
          open
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }
        ${
          isDarkMode
            ? "bg-slate-800 text-white border-slate-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
        >
          {categories?.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                setCategory(cat);
                setOpen(false);
              }}
              className={`px-4 py-2 capitalize cursor-pointer
                ${isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"} 
                ${category === cat ? "font-bold" : ""
              }`} 
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Navbar />

      {/* Header Section */}
      <header className="max-w-7xl mx-auto mt-10 px-5 sm:px-10 text-center transition-colors duration-200">
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-3 ${
            isDarkMode ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          Discover Our Products
        </h1>
        <p
          className={`text-sm sm:text-base mb-10 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Browse our collection of high-quality products and find the perfect
          fit for your needs.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl w-full mx-auto mb-10 flex flex-row gap-3 sm:gap-4">
          {/* Search */}
          <Input
            type="text"
            placeholder="Search by name or category..."
            className="flex-1 px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <CategoryDropdown
            categories={categories}
            category={category}
            setCategory={setCategory}
            isDarkMode={isDarkMode}
          />
        </div>
      </header>

      {/* Grid Products */}
      <main className="flex flex-col items-center flex-1 px-2 lg:px-6 py-3 gap-8 lg:gap-12">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products found for "<span className="font-medium">{search}</span>
            "
          </p>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center mx-auto">
            {filtered.map((product) => (
              <ProductsCard key={product.id}>
                <ProductsCard.Header image={product.image} />
                <ProductsCard.Body
                  title={product.title}
                  rating={product.rating}
                >
                  {product.description}
                </ProductsCard.Body>
                <ProductsCard.Footer price={product.price} id={product.id} />
              </ProductsCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
