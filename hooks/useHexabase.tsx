import { HexabaseClient } from "@hexabase/hexabase-js";

import { create } from "zustand";

interface HexabaseParams {
  client: HexabaseClient | null;
  setClientHxb: (client: HexabaseClient | null) => void;
}

const useHexabaseStore = create<HexabaseParams>((set: any) => ({
  client: null,
  setClientHxb: (data: any) =>
    set((state: any) => {
      return { ...state, client: data };
    })
}));

const useHexabase = async (email: string, password: string) => {
  const client = new HexabaseClient();
  const loginResult = await client.login({
    email: email,
    password: password
  });

  if (loginResult) {
    return client;
  }
  return false;
};

export { useHexabase, useHexabaseStore };
