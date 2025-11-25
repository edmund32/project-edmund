import { create } from "zustand";

export const usePopupAlertStore = create((set) => ({
  isOpen: false,
  message: "",

  openPopup: (msg) => set({ isOpen: true, message: msg }),
  closePopup: () => set({ isOpen: false, message: "" }),
}));
