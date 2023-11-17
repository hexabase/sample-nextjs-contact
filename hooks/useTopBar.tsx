import { create } from "zustand";

interface HeaderStoreParams {
  title?: string;
  setTitle: (tittle: string | null) => void;
}

const useTopBarStore = create<HeaderStoreParams>((set: any) => ({
  title: "",
  setTitle: (text: any) =>
    set((state: any) => {
      return { ...state, title: text };
    }),
}));

export { useTopBarStore };
