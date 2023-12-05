import { create } from "zustand";

interface HeaderStoreParams {
  globalCustomerId?: string;
  setGlobalCustomerId: (customerId: string | number | null) => void;
}

const useCustomerIdStore = create<HeaderStoreParams>((set: any) => ({
  globalCustomerId: "",
  setGlobalCustomerId: (text: string | number | null) =>
    set((state: any) => {
      return { ...state, globalCustomerId: text };
    }),
}));

export { useCustomerIdStore };
