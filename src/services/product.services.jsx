import { fakestore } from "./fakestore";

export const getProducts = async () => {
  try {
    const res = await fakestore.get("/products");
    return res.data;
  } catch (err) {
    console.error("Error getProducts:", err);
    return [];
  }
};

export const getDetailProduct = async (id, callback) => {
  if (!id) return;

  try {
    const res = await fakestore.get(`/products/${id}`);
    callback(res.data);
  } catch (err) {
    console.error("Error getDetailProduct:", err);
  }
};
