import { getDatastoreItems } from "./api";

class CommentServiceApi {
  getListComments = async (params: any) => {
    return getDatastoreItems({
      datastoreId: process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID,
      payload: params
    });
  };
  createComment = async (params: any) => {
    //TODO: add hxb sdk
  };
}

export const commentServiceApi = new CommentServiceApi();
