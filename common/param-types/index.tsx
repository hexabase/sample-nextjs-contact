// Define Interface here

export interface DefaultSearchList {
  page: number;
  per_page: number;
}

export interface HomePageDataType {
  id: string | number;
  fields: {
    id: string | number;
    company_name: string;
    status: string;
  }
  updatedAt: string;
  createdAt: string;
  unfinished_tasks?: number;
  new_tasks?: number;
  received_tasks?: number;
  in_progress_tasks?: number;
  confirmed_tasks?: number;
}

export interface ListInquiriesDataType {
  id: string,
  i_id: string,
  title: string,
  pic: string,
  updated_at: string,
  status: string,
  type: string,
  importance: string
}

export interface detailInquiryPayloadDataType {
  format: string,
  include_linked_items: boolean,
  include_lookups: boolean
}

export interface createInquiryPayloadDataType {
  item: {
    Title: string,
    system_due_date: string,
    content: string,
    user_id: string | any,
    status: string | undefined,
    customer_id: string | any,
  },
  ensure_transaction: boolean,
}

export type TFieldValueConvert = {
  [key: string]: any;
};
