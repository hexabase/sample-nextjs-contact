import { useQuery } from "@tanstack/react-query";
import { userServiceApi } from "@/services/user-service";
import { create } from "zustand";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@/common/constants/cookie";

const { getUserInfo } = userServiceApi;

interface UserStoreParams {
  user: any | null;
  setUser: (user: any | null) => void;
}

const useUserStore = create<UserStoreParams>((set: any) => ({
  user: null,
  setUser: (data: any) =>
    set((state: any) => {
      return { ...state, user: data };
    })
}));

const useUser = () => {
  const { user, setUser } = useUserStore();
  const { data, isSuccess } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    onSuccess: (data) => setUser(data)
  });

  if (isSuccess) {
    Cookies.set(COOKIES_KEY.IS_WS_ADMIN, user?.is_ws_admin);
    Cookies.set(COOKIES_KEY.USER_ID, user?.u_id);
  }
  return data;
};

export { useUser, useUserStore };
