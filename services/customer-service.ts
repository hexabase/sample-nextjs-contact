import { getDatastoreItems } from "./api";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";

class CustomersServiceApi {
  getListCustomer = async (params: GetItemsParameters) => {
    return getDatastoreItems({
      datastoreId: process.env.NEXT_PUBLIC_CUSTOMER_DATASTORE_ID,
      payload: params
    });
  };
}

export const customersServiceApi = new CustomersServiceApi();
