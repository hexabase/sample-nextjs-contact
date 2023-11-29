import { COOKIES_KEY } from "@/common/constants/cookie";
import Cookies from "js-cookie";
import { HexabaseClient, Item } from "@hexabase/hexabase-js";
import { CREATE_DATASTORE_FROM_TEMPLATE } from "@hexabase/hexabase-js/src/lib/graphql/datastore";
import { ITEM_DETAIL, UPDATE_ITEM } from "@hexabase/hexabase-js/src/lib/graphql/item";
import { DtItemDetail } from "@hexabase/hexabase-js/src/lib/types/item/response";

interface dataStoreProps {
  workspaceId?: string;
  projectId?: string;
  datastoreId: string | undefined;
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

const getDatastoreItem = async (props: dataStoreProps): Promise<DtItemDetail> => {
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
  return await datastore.request(CREATE_DATASTORE_FROM_TEMPLATE, { payload });
};

const updateDatastoreItem = async (props: dataStoreProps) => {
  const { payload } = props;
  const datastore = await initializeDatastore(props);
  return await datastore.request(UPDATE_ITEM, { itemUpdatePayload: payload });
};

export {
  api,
  getDatastoreItems,
  createDatastoreItem,
  updateDatastoreItem,
  getDatastoreItem
};
