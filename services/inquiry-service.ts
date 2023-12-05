import {
  createDatastoreItem,
  deleteDatastoreItem,
  getDatastoreItem,
  getDatastoreItems,
  updateDatastoreItem
} from "./api";
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
    return createDatastoreItem({
      payload: {
        ...params,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      }
    });
  };
  updateInquiry = async (params: any) => {
    return updateDatastoreItem({
      payload: {
        ...params,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      }
    });
  };
  getInquiry = async (payloadGet: detailInquiryPayloadDataType, itemId: string | string[] | undefined) => {
    return getDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      itemId: itemId,
      payload: payloadGet
    });
  };
  deleteInquiry = async (itemId: any) => {
    return deleteDatastoreItem({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      payload: {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
        itemId: itemId,
      }
    })
  };
}

export const inquiryServiceApi = new InquiryServiceApi();
