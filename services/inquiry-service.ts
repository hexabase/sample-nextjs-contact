import { getDatastoreItem, getDatastoreItems, updateDatastoreItem } from "./api";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";
import { detailInquiryPayloadDataType } from "@/common/param-types";

class InquiryServiceApi {
  getListInquiry = async (params: GetItemsParameters) => {
    return getDatastoreItems({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      payload: params
    });
  };
  createInquiry = async (params: any) => {
    return updateDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      payload: params
    });
  };
  updateInquiry = async (params: any, itemId: any) => {
    return updateDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      payload: params
    });
  };
  getInquiry = async (payloadGet: detailInquiryPayloadDataType, itemId: string | string[] | undefined) => {
    return getDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      itemId: itemId,
      payload: payloadGet
    });
  };
  deleteInquiry = async (params: any, itemId: any) => {
    //TODO: add hxb sdk
  };
}

export const inquiryServiceApi = new InquiryServiceApi();
