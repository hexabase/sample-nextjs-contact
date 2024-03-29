import { detailInquiryPayloadDataType } from "@/common/libs/types";
import {
  createDatastoreItem,
  deleteDatastoreItem,
  getDatastoreItem, getDatastoreItemHistories,
  getDatastoreItems,
  updateDatastoreItem
} from "./api";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";
import { GetHistoryPl } from "@hexabase/hexabase-js/src/lib/types/item";

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
  getInquiryHistories = async (itemId: any, getHistoryParamQueries?: GetHistoryPl) => {
    return getDatastoreItemHistories({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      itemId: itemId,
      payload: getHistoryParamQueries
    })
  };
}

export const inquiryServiceApi = new InquiryServiceApi();
