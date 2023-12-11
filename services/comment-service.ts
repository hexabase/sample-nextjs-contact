import { createDatastoreItem, getDatastoreItems } from "./api";

class CommentServiceApi {
  getListComments = async (params: any) => {
    return getDatastoreItems({
      datastoreId: process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID,
      payload: params
    });
  };
  createComment = async (params: any) => {
    return createDatastoreItem({
      payload: {
        ...params,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        datastoreId: process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID
      }
    });
  };
}

export const commentServiceApi = new CommentServiceApi();
