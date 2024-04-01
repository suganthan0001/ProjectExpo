import { create } from "zustand";

const useStore = create((set) => ({
  theme: false,
  setTheme: (newTheme) => set({ theme: newTheme }),
}));

export default useStore;
