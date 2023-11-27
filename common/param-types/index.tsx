// Define Interface here

export interface DefaultSearchList {
  page: number;
  per_page: number;
}

export interface HomePageDataType {
  id: string | number;
  i_id: string;
  company_name: string;
  updated_at: string;
  created_at: string;
  unfinished_tasks: number;
  new_tasks: number;
  received_tasks: number;
  in_progress_tasks: number;
  confirmed_tasks: number;
}

export interface SelectPropsType {
  value: string,
  label: string
}

export interface SortFieldsType {
  id: string,
  order: string,
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

export interface homePagePayloadDataType {
  page: number,
  per_page: number,
  use_display_id: boolean,
  return_number_value: boolean,
  conditions?: any[],
  sort_fields?: SortFieldsType[]
  use_or_condition?: boolean,
}

export interface listInquiriesPayloadDataType {
  page: number,
  per_page: number,
  use_display_id: boolean,
  return_number_value: boolean,
  conditions?: any[],
  sortFields?: SortFieldsType[]
  use_or_condition?: boolean,
}

export interface detailInquiryPayloadDataType {
  format: string,
  include_linked_items: boolean,
  include_lookups: boolean
}

export interface updateStatusInquiryPayloadDataType {
  item: {
    status: string
  },
  is_force_update?: boolean,
}

export interface itemCreateInquiryPayloadDataType {
  Title: string,
  system_due_date: string,
  content: string,
  user_id: string,
  status: string,
  customer_id: string,
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
