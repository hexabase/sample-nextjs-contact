import { FC, useEffect, useState } from "react";
import { useTopBarStore } from "@/hooks/useTopBar";
import { DEFAULT_PARAM_SEARCH, PARAM_TOP_BAR_TITLE } from "@/common/constants/params";
import TableComponent from "@/components/CommonTable";
import type { ColumnsType } from "antd/es/table";
import { HomePageDataType } from "@/common/param-types";
import { TOP_PAGE_NAME_SPACES } from "@/common/constants/namespaces";
import { Tooltip } from "antd";
import { APP_ROUTES } from "@/common/constants/routes";
import { customersServiceApi } from "@/services/customer-service";
import { formatTime } from "@/utils";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import { useCustomerIdStore } from "@/hooks/useCustomerId";
import { useRouter } from "next/router";
import TopPageFilterComponent from "@/components/CommonTable/Filter/TopPageFilter";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";

const HomeContainer: FC = () => {
  // set title topBar
  const { setTitle } = useTopBarStore();
  useEffect(() => {
    setTitle(PARAM_TOP_BAR_TITLE.TOP_PAGE);
  }, []);

  const router = useRouter();

  const [tableData, setTableData] = useState<any>();
  const { setGlobalCustomerId } = useCustomerIdStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalCount | 0
  });

  const [payloadGet, setPayloadGet] = useState<GetItemsParameters>({
    page: pagination.page || 1,
    per_page: pagination.limit || 10,
    use_display_id: true,
    return_number_value: true
  });

  useEffect(() => {
    setIsLoading(true);
    getListCustomer(payloadGet).then(r => {
      setTableData(r);
      setIsLoading(false);
    });
  }, [payloadGet]);

  const { getListCustomer } = customersServiceApi;

  const columns: ColumnsType<HomePageDataType> = [
    {
      title: TOP_PAGE_NAME_SPACES.ID.title,
      dataIndex: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      key: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (_, record) => (
        <button className="w-full text-center" onClick={() => onClickRow(record)}>
          {record?.fields?.id}
        </button>
      )
    },
    {
      title: TOP_PAGE_NAME_SPACES.COMPANY_NAME.title,
      dataIndex: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      key: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text, record) => (
        <Tooltip title={text}>
          <button onClick={() => onClickRow(record)}>
            {record?.fields?.company_name}
          </button>
        </Tooltip>
      )
    },
    {
      title: TOP_PAGE_NAME_SPACES.UPDATED_AT.title,
      dataIndex: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      key: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (_, record) => (<span className="flex justify-center w-full">{
        record?.updatedAt
          ? formatTime(record?.updatedAt, SPLASH_REVERSED_DATE_FORMAT)
          : formatTime(record?.createdAt, SPLASH_REVERSED_DATE_FORMAT)
      }</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.NEW_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    }
  ];

  const onClickRow = (record: HomePageDataType) => {
    setGlobalCustomerId(record?.id);
    setIsLoading(true);
    router.push(APP_ROUTES.LIST_INQUIRY).then();
  };

  return (
    <>
      <TopPageFilterComponent
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
      />
      <TableComponent
        tableData={tableData}
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        tableName="top_page_table"
      />
    </>
  );
};

export default HomeContainer;
