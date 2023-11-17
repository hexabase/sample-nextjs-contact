import { ILogin } from "@/common/form-schemas";
import { api } from "./api";
import { API_ROUTES } from "@/common/constants/routes";

class AuthServiceApi {
  login = async (params: ILogin) => {
    return api.post(API_ROUTES.LOGIN, { ...params });
  };
}

export const authServiceApi = new AuthServiceApi();
