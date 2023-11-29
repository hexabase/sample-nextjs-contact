import { ILogin } from "@/common/form-schemas";
import { api } from "./api";

class AuthServiceApi {
  login = async (params: ILogin) => {
    await api.login(params)
    return api;
  };
}

export const authServiceApi = new AuthServiceApi();
