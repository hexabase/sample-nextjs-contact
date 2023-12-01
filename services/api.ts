import { COOKIES_KEY } from "@/common/constants/cookie";
import Cookies from "js-cookie";
import { HexabaseClient, Item } from "@hexabase/hexabase-js";
import {
  CREATE_NEW_ITEM,
  DATASTORE_UPDATE_ITEM,
  DELETE_ITEM,
  ITEM_DETAIL
} from "@hexabase/hexabase-js/src/lib/graphql/item";

interface dataStoreProps {
  workspaceId?: string;
  projectId?: string;
  datastoreId?: string | undefined;
  payload?: any;
  itemId?: any;
}

const api = new HexabaseClient();
const token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
if (token) {
  api.setToken(token).then();
}

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

const getDatastoreItems = async (props: dataStoreProps): Promise<{ items: Item[]; totalCount: number }> => {
  const { payload } = props;
  const datastore = await initializeDatastore(props);
  return datastore.itemsWithCount(payload);
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
  getDatastoreItems,
  createDatastoreItem,
  updateDatastoreItem,
  deleteDatastoreItem,
  getDatastoreItem
};
