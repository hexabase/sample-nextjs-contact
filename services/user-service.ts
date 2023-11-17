import { api } from './api';
import { API_ROUTES } from "@/common/constants/routes";

class UserServiceApi {
  getUserInfo = async () => {
    return api.get(API_ROUTES.USER_INFO);
  };
}

export const userServiceApi = new UserServiceApi();
