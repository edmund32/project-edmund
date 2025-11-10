const FAKESTORE_URL = "https://fakestoreapi.com/products";

// Ambil semua produk
export const getProducts = async () => {
  try {
    const res = await fetch(FAKESTORE_URL);
    if (!res.ok) throw new Error("Gagal memuat daftar produk");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error getProducts:", err);
    return [];
  }
};

// Ambil detail produk berdasarkan ID
export const getDetailProduct = async (id, callback) => {
  if(!id) return;
  try {
    const res = await fetch(`${FAKESTORE_URL}/${id}`);
    if (!res.ok) throw new Error("Gagal memuat detail produk");
    const data = await res.json();
    callback(data);
  } catch (err) {
    console.error("Error getDetailProduct:", err);
  }
};
