import { api } from "./api";

export const HEXABASE_APPLICATION_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const HEXABASE_COMMENT_DATASTORE_ID = process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID;
export const HEXABASE_COMMENTS_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_COMMENT_DATASTORE_ID}/items/search`;
export const HEXABASE_CREATE_COMMENT_PATH = `applications/${HEXABASE_APPLICATION_ID}/datastores/${HEXABASE_COMMENT_DATASTORE_ID}/items/new`;

class CommentServiceApi {
  getListComments = async (params: any) => {
    return api.post(HEXABASE_COMMENTS_PATH, { ...params });
  };
  createComment = async (params: any) => {
    return api.post(HEXABASE_CREATE_COMMENT_PATH, { ...params });
  };
}

export const commentServiceApi = new CommentServiceApi();
