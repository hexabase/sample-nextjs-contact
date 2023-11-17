import { api } from "./api";

export const HEXABASE_APPLICATION_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const HEXABASE_INQUIRY_DATASTORE_ID = process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID;
export const HEXABASE_INQUIRIES_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_INQUIRY_DATASTORE_ID}/items/search`;
export const HEXABASE_CREATE_INQUIRY_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_INQUIRY_DATASTORE_ID}/items/new`;
export const HEXABASE_UPDATE_INQUIRY_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_INQUIRY_DATASTORE_ID}/items/edit/`;
export const HEXABASE_DETAIL_INQUIRY_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_INQUIRY_DATASTORE_ID}/items/details/`;
export const HEXABASE_DELETE_INQUIRY_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_INQUIRY_DATASTORE_ID}/items/delete/`;


class InquiryServiceApi {
  getListInquiry = async (params: any) => {
    return api.post(HEXABASE_INQUIRIES_PATH, { ...params });
  };
  createInquiry = async (params: any) => {
    return api.post(HEXABASE_CREATE_INQUIRY_PATH, { ...params });
  };
  updateInquiry = async (params: any, itemId: any) => {
    return api.post(`${HEXABASE_UPDATE_INQUIRY_PATH}${itemId}`, { ...params });
  };
  getInquiry = async (params: any, itemId: any) => {
    return api.get(`${HEXABASE_DETAIL_INQUIRY_PATH}${itemId}`, { ...params });
  };
  deleteInquiry = async (params: any, itemId: any) => {
    return api.delete(`${HEXABASE_DELETE_INQUIRY_PATH}${itemId}`, { data: params });
  };
}

export const inquiryServiceApi = new InquiryServiceApi();
