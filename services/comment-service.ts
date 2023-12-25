import { createDatastoreItemHistories, getDatastoreItems } from "./api";

class CommentServiceApi {
  getListComments = async (params: any) => {
    return getDatastoreItems({
      datastoreId: process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID,
      payload: params
    });
  };
  createComment = async (params: any) => {
    return createDatastoreItemHistories({
      datastoreId: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
      payload: params
    });
  };
}

export const commentServiceApi = new CommentServiceApi();
