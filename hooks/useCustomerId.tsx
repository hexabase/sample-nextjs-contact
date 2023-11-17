import { create } from "zustand";

interface HeaderStoreParams {
  globalCustomerId?: string;
  setGlobalCustomerId: (customerId: string | null) => void;
}

const useCustomerIdStore = create<HeaderStoreParams>((set: any) => ({
  globalCustomerId: "",
  setGlobalCustomerId: (text: any) =>
    set((state: any) => {
      return { ...state, globalCustomerId: text };
    }),
}));

export { useCustomerIdStore };
