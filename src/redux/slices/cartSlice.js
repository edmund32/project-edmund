import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.data.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        itemInCart.qty += action.payload.qty || 1;
      } else {
        state.data.push({ ...action.payload, qty: action.payload.qty || 1 });
      }

      // 🔹 simpan ke localStorage setiap kali cart berubah
      localStorage.setItem("cart", JSON.stringify(state.data));
    },

    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.data));
    },

    clearCart: (state) => {
      state.data = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
