import { getDatastoreItem } from "./api";

class UserServiceApi {
  getUserInfo = async (itemId: string | string[] | undefined) => {
    return getDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_USER_DATASTORE_ID,
      itemId: itemId
    });
  };
}

export const userServiceApi = new UserServiceApi();
