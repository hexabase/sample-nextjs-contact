import { FC, useEffect, useState } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";
import { useTopBarStore } from "@/hooks/useTopBar";
import { DEFAULT_PARAM_SEARCH, PARAM_TOP_BAR_TITLE } from "@/common/constants/params";
import CustomTable from "@/components/tables";
import type { ColumnsType } from "antd/es/table";
import { homPagePayloadDataType, TopPageDataType } from "@/common/param-types";
import { TOP_PAGE_NAME_SPACES } from "@/common/constants/namespaces";
import { DatePicker, Select, Spin, Tooltip } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { APP_ROUTES } from "@/common/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { customersServiceApi } from "@/services/customer-service";
import { formatTime } from "@/utils";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import { useCustomerIdStore } from "@/hooks/useCustomerId";
import { useRouter } from "next/router";

const HomeContainer: FC = () => {
  // set title topBar
  const { setTitle } = useTopBarStore();
  useEffect(() => {
    setTitle(PARAM_TOP_BAR_TITLE.TOP_PAGE);
  }, []);

  const router = useRouter();

  const [tableData, setTableData] = useState<any>();
  const { setGlobalCustomerId } = useCustomerIdStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [searchDate, setSearchDate] = useState("");
  const [searchCompanyId, setSearchCompanyId] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalItems
  });

  const [payloadGet, setPayloadGet] = useState<homPagePayloadDataType>({
    page: pagination.page || 1,
    per_page: pagination.limit || 10,
    use_display_id: true,
    return_number_value: true
  });

  useEffect(() => {
    setLoading(true);
    getListCustomer(payloadGet).then(r => {
      setTableData(r);
      setLoading(false);
    });
  }, [payloadGet]);

  useEffect(() => {
    const tempPagination = { ...pagination };
    tempPagination.total = tableData?.totalItems;
    setPagination(tempPagination);
  }, [tableData]);

  const setPage = (page: number) => {
    const tempPagination = { ...pagination };
    tempPagination.page = page;
    setPayloadGet({
      ...payloadGet,
      page: page
    })
    setPagination(tempPagination);
  };

  const setLimit = (limit: number) => {
    const tempPagination = { ...pagination };
    tempPagination.limit = limit;
    setPagination(tempPagination);
  };

  const handleChangeCompanyName = (value: string) => {
    setSearchCompanyId(value);
  };

  const handleChangeUpdatedAt = (value: any) => {
    setSearchDate(value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const dropdownPayload = {
    "page": DEFAULT_PARAM_SEARCH.page,
    "per_page": 999999,
    "use_display_id": true,
    "return_number_value": true
  };

  const { getListCustomer } = customersServiceApi;

  const setDropdownData = (data: any) => {
    const options: any[] = [];
    const objects = data?.items;
    objects.forEach((item: any) => {
      options.push({
        value: item?.id,
        label: item?.company_name
      });
    });
    setDropdownOptions(options);
  };

  useQuery({
    queryKey: ["customers", { dropdownPayload }],
    queryFn: () => getListCustomer(dropdownPayload),
    onSuccess: (data) => setDropdownData(data)
  });

  const handleSubmit = () => {
    const conditions = [];
    if (searchCompanyId) {
      conditions.push(
        {
          "conditions": [
            { "id": "id", "search_value": [`${searchCompanyId}`] }
          ]
        }
      );
    }
    if (searchDate) {
      conditions.push(
        {
          "conditions": [
            { "id": "updated_at", "search_value": [`${searchDate}`] }
          ]
        }
      );
    }
    // @ts-ignore
    setPayloadGet({
      ...payloadGet,
      conditions: conditions,
      use_or_condition: false
    });
  };

  const columns: ColumnsType<TopPageDataType> = [
    {
      title: TOP_PAGE_NAME_SPACES.ID.title,
      dataIndex: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      key: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.ID.dataIndex].localeCompare(b?.[TOP_PAGE_NAME_SPACES.ID.dataIndex]),
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.COMPANY_NAME.title,
      dataIndex: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      key: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex].length - b?.[TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex].length,
      ellipsis: true,
      width: "12.5%",
      render: (text, record) => (
        <Tooltip title={text}>
          <button onClick={() => onClickRow(record)} style={{
            maxWidth: "100%",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}>
            {text}
          </button>
        </Tooltip>
      )
    },
    {
      title: TOP_PAGE_NAME_SPACES.UPDATED_AT.title,
      dataIndex: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      key: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex].localeCompare(b?.[TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex]),
      ellipsis: true,
      width: "12.5%",
      render: (_, record) => (<span className="flex justify-center w-full">{
        record?.updated_at
          ? formatTime(record?.updated_at, SPLASH_REVERSED_DATE_FORMAT)
          : formatTime(record?.created_at, SPLASH_REVERSED_DATE_FORMAT)
      }</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex] - b?.[TOP_PAGE_NAME_SPACES.UNFINISHED_TASKS.dataIndex],
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.NEW_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex] - b?.[TOP_PAGE_NAME_SPACES.NEW_TASKS.dataIndex],
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex] - b?.[TOP_PAGE_NAME_SPACES.RECEIVED_TASKS.dataIndex],
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex] - b?.[TOP_PAGE_NAME_SPACES.IN_PROGRESS_TASKS.dataIndex],
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    },
    {
      title: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.title,
      dataIndex: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex,
      key: TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex,
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a?.[TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex] - b?.[TOP_PAGE_NAME_SPACES.CONFIRMED_TASKS.dataIndex],
      ellipsis: true,
      width: "12.5%",
      render: (text) => (<span className="flex justify-center w-full">{text ? text : "-"}</span>)
    }
  ];

  const onClickRow = (record: TopPageDataType) => {
    setGlobalCustomerId(record?.i_id);
    router.push(APP_ROUTES.LIST_INQUIRY);
  };

  return (
    <>
      <div className={cx(styles.home_wrapper)}>
        <div className="table-list">
          <div className="flex justify-start items-center mb-5 gap-3">
            <Select
              showSearch
              optionFilterProp="children"
              style={{ width: "20%" }}
              placeholder={TOP_PAGE_NAME_SPACES.COMPANY_NAME_FILTER}
              onChange={handleChangeCompanyName}
              filterOption={filterOption}
              allowClear={true}
              options={dropdownOptions}
            />
            <DatePicker
              style={{ width: "20%" }}
              placeholder={TOP_PAGE_NAME_SPACES.UPDATED_AT_FILTER}
              allowClear={true}
              onChange={handleChangeUpdatedAt}
            />

            <button className={cx(styles.submit_filter, "flex gap-1 items-center")} onClick={handleSubmit}>
              <AiOutlineSearch />
              <span>{TOP_PAGE_NAME_SPACES.SUBMIT_FILTER}</span>
            </button>

          </div>
          <Spin spinning={loading}>
            <CustomTable
              columns={columns}
              data={tableData?.items}
              pagination={pagination}
              setPage={setPage}
              setLimit={setLimit}
              tableName="home-page-table"
              rowKey="key"
              showQuickJumper={true}
            />
          </Spin>
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
