import { api } from './api';

export const HEXABASE_APPLICATION_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const HEXABASE_CUSTOMER_DATASTORE_ID = process.env.NEXT_PUBLIC_CUSTOMER_DATASTORE_ID;
export const HEXABASE_CUSTOMERS_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_CUSTOMER_DATASTORE_ID}/items/search`


class CustomersServiceApi {
  getListCustomer = async (params: any) => {
    return api.post(HEXABASE_CUSTOMERS_PATH, { ...params });
  };
}

export const customersServiceApi = new CustomersServiceApi();
