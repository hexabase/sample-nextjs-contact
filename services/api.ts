import { COOKIES_KEY } from "@/common/constants/cookie";
import Cookies from "js-cookie";
import { HexabaseClient } from "@hexabase/hexabase-js";
import {
  CREATE_NEW_ITEM,
  DATASTORE_UPDATE_ITEM,
  DELETE_ITEM,
  ITEM_DETAIL, ITEM_HISTORIES, POST_NEW_ITEM_HISTORY
} from "@hexabase/hexabase-js/src/lib/graphql/item";
import { APP_ROUTES } from "@/common/constants/routes";
import {
  DtDatastoreCreateCommentItem,
  DtItemHistories
} from "@hexabase/hexabase-js/src/lib/types/item";

interface dataStoreProps {
  workspaceId?: string;
  projectId?: string;
  datastoreId?: string | undefined;
  payload?: any;
  itemId?: any;
  unread?: boolean;
}

const api = new HexabaseClient();
const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
if (token) {
  api.setToken(token).then();
}

const logout = () => {
  Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
  Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
  Cookies.remove(COOKIES_KEY.USERNAME);
  Cookies.remove(COOKIES_KEY.EMAIL);
  Cookies.remove(COOKIES_KEY.USER_ID);
  Cookies.remove(COOKIES_KEY.PROFILE_PICTURE);
  window.location.href = APP_ROUTES.LOGIN;
};

const initializeDatastore = async (props: dataStoreProps) => {
  const {
    workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID,
    projectId = process.env.NEXT_PUBLIC_PROJECT_ID,
    datastoreId
  } = props;
  const workspace = api.workspace(workspaceId);
  const project = await workspace.project(projectId);
  return project.datastore(datastoreId);
};

const getDatastoreItems = async (props: dataStoreProps) => {
  const { payload } = props;
  const datastore = await initializeDatastore(props).catch(err => {
    if (err?.response?.errors?.[0]?.message === "TOKEN_INVALID") {
      logout();
    }
  });
  return datastore?.itemsWithCount(payload);
};

const getDatastoreItem = async (props: dataStoreProps) => {
  const { itemId, payload } = props;
  const datastore = await initializeDatastore(props);
  const defaultPayload = {
    include_lookups: true,
    use_display_id: true,
    return_number_value: true,
    format: "map",
    include_linked_items: true
  };
  const params = {
    datastoreId: datastore.id,
    itemId: itemId,
    projectId: datastore.project.id,
    datastoreItemDetailParams: payload ?? defaultPayload
  };
  // return datastore.item(itemId);
  return datastore.request(ITEM_DETAIL, params);
};

const getDatastoreItemHistories = async (props: dataStoreProps) => {
  const { itemId, payload } = props;
  const datastore = await initializeDatastore(props);
  const params = {
    projectId: datastore.project.id,
    datastoreId: datastore.id,
    itemId: itemId,
    payload
  };
  const res: DtItemHistories = await datastore.request(ITEM_HISTORIES, params);
  const histories = res.getHistories.histories;
  return {
    unread: res.getHistories.unread,
    histories
  };
};

const createDatastoreItemHistories = async (props: dataStoreProps) => {
  const { payload, unread = true } = props;
  const datastore = await initializeDatastore(props);
  payload.post_mode = ""
  payload.workspace_id = process.env.NEXT_PUBLIC_WORKSPACE_ID
  payload.project_id = datastore.project.id
  payload.datastore_id = datastore.id

  if (unread) {
    payload.is_send_item_unread = true;
  }
  // handle call graphql
  const res: DtDatastoreCreateCommentItem = await datastore.request(POST_NEW_ITEM_HISTORY, { payload });
  return res;
};

const createDatastoreItem = async (props: dataStoreProps) => {
  const { payload } = props;
  const datastore = await initializeDatastore(props);
  return await datastore.request(CREATE_NEW_ITEM, { ...payload });
};

const updateDatastoreItem = async (props: dataStoreProps) => {
  const { payload } = props;
  const datastore = await initializeDatastore(props);
  return await datastore.request(DATASTORE_UPDATE_ITEM, { ...payload });
};

const deleteDatastoreItem = async (props: dataStoreProps) => {
  const { payload } = props;
  const datastore = await initializeDatastore(props);
  const item = await datastore.item();
  const action = await item.action("DeleteItem");
  return await datastore.request(DELETE_ITEM, {
    ...payload,
    deleteItemReq: { a_id: action.id }
  });
};

export {
  api,
  logout,
  getDatastoreItems,
  createDatastoreItem,
  updateDatastoreItem,
  deleteDatastoreItem,
  getDatastoreItem,
  getDatastoreItemHistories,
  createDatastoreItemHistories
};
