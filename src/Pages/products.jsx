import { useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { DarkMode } from "../context/DarkMode";
import Navbar from "../components/Layouts/Navbar";
import { ProductsCard } from "../components/Fragments/ProductsCard";
import { getProducts } from "../services/product.services";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { isDarkMode } = useContext(DarkMode);
  const { isAuthChecked } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      const data = await getProducts();
      setProducts(data);
      setFiltered(data);
    };
    loadData();
  }, []);

  // Handle search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        products.filter(
          (p) =>
            p.title.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, products]);

  if (!isAuthChecked) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Navbar />

      {/* Header Section */}
      <header className="max-w-7xl mx-auto mt-10 px-5 sm:px-10 text-center transition-colors duration-300">
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
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by product name or category..."
            className={` w-full px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800 text-white placeholder-gray-400"
                : "bg-white text-gray-800 placeholder-gray-500"
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
