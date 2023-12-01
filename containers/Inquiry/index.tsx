import React, { useEffect, useState } from "react";
import { Popconfirm, Tooltip } from "antd";
import styles from "./styles.module.scss";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { inquiryServiceApi } from "@/services/inquiry-service";
import { formatTime } from "@/utils";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import {
  DEFAULT_PARAM_SEARCH,
  inquiryStatus,
  inquiryStatusParams,
  PARAM_TOP_BAR_TITLE
} from "@/common/constants/params";
import { LIST_INQUIRIES_NAME_SPACES } from "@/common/constants/namespaces";
import { APP_ROUTES } from "@/common/constants/routes";
import { ListInquiriesDataType, UpdateItemParameters } from "@/common/param-types";
import { ColumnsType } from "antd/es/table";
import { customersServiceApi } from "@/services/customer-service";
import { useCustomerIdStore } from "@/hooks/useCustomerId";
import TableComponent from "@/components/CommonTable";
import InquiryFilterComponent from "@/components/CommonTable/Filter/InquiryFilter";
import { useTopBarStore } from "@/hooks/useTopBar";
import { useRouter } from "next/router";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";


function InquiryContainer() {
  const { setTitle } = useTopBarStore();
  useEffect(() => setTitle(PARAM_TOP_BAR_TITLE.INQUIRY_PAGE), []);

  const router = useRouter();
  const { getListInquiry, updateInquiry } = inquiryServiceApi;
  const { getListCustomer } = customersServiceApi;
  const { globalCustomerId, setGlobalCustomerId } = useCustomerIdStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDropdown, setIsLoadingDropdown] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>();
  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalCount | 0
  });
  const [customerId, setCustomerId] = useState<string | any>(globalCustomerId);
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);

  const [
    payloadGet, setPayloadGet
  ] = useState<GetItemsParameters>({
    page: pagination.page,
    per_page: pagination.limit,
    use_display_id: true,
    return_number_value: true,
    conditions: [
      { "id": "customer_id", "search_value": [`${customerId}`] }
    ]
  });

  useEffect(() => {
    setGlobalCustomerId(customerId);
  }, [customerId]);

  const dropdownPayload = {
    "page": DEFAULT_PARAM_SEARCH.page,
    "per_page": 9999,
    "use_display_id": true,
    "return_number_value": true
  };

  useEffect(() => {
    getListCustomer(dropdownPayload).then(r => {
      const response: any = r;
      setDropdownData(response);
      if (customerId === "" || customerId === null || customerId === undefined) {
        setGlobalCustomerId(response?.items?.[0]?.id);
      }
      setIsLoadingDropdown(false);
    });
  }, []);

  const setDropdownData = (data: any) => {
    const options: any[] = [];
    data?.items?.forEach((item: any) => {
      options.push({
        value: item?.id,
        label: item?.fields?.company_name
      });
    });
    setCustomerOptions(options);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsFetching(false);
    getListInquiry(payloadGet).then(r => {
      setTableData(r);
      setIsLoading(false);
    });
  }, [payloadGet, isFetching]);

  const handleUpdateStatus = (status: any, record: any) => {
    const statusObject = inquiryStatus.find((obj: any) => {
      return obj.display === status;
    });
    const payload: UpdateItemParameters = {
      itemActionParameters: {
        item: { status: statusObject?.id },
        rev_no: record?.revNo
      },
      itemId: record?.id
    };
    updateInquiry(payload).then(_ => setIsFetching(true));
  };

  const columns: ColumnsType<ListInquiriesDataType> = [
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "20%",
      ellipsis: true,
      sorter: true,
      render: (_, record: any) => (
        <Tooltip title={record?.fields?.Title}>
          <button onClick={() => {
            setIsLoading(true);
            router.push(APP_ROUTES.DetailInquiry(record.id)).then();
          }}>{record?.fields?.Title}</button>
        </Tooltip>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "20%",
      ellipsis: true,
      sorter: true,
      render: (_, record: any) => (
        <Tooltip title={record?.fields?.pic}>
          <span>{record?.fields?.pic}</span>
        </Tooltip>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "10%",
      sorter: true,
      render: (_, record: any) => {
        const transformedStatus = inquiryStatusParams(record?.fields?.status?.en);
        const stylesCss = {
          borderColor: transformedStatus?.borderColor,
          color: transformedStatus?.color
        };
        const statusDisplay = transformedStatus?.display ? transformedStatus?.display : "-";
        const currentInquiryStatus = inquiryStatus.find((obj: any) => {
          return obj.display === statusDisplay;
        });

        return (
          <Popconfirm
            icon={false}
            showCancel={false}
            placement="rightTop"
            okButtonProps={{
              className: styles.btnCf
            }}
            title={
              statusDisplay && (
                <div className="flex flex-col gap-2 pt-2">
                  {currentInquiryStatus?.previousStatus && (
                    <div
                      className="cursor-pointer flex gap-2 text-[#808080] items-center hover:text-blue-300"
                      onClick={() => handleUpdateStatus(currentInquiryStatus?.previousStatus, record)}
                    >
                      <IconArrowLeft width={28} height={28} />
                      <span className="text-lg text-black hover:text-blue-300">
                    {`${currentInquiryStatus?.previousStatus}${LIST_INQUIRIES_NAME_SPACES.BACK_STATUS}`}
                  </span>
                    </div>
                  )}
                  {currentInquiryStatus?.nextStatus && (
                    <div
                      className="cursor-pointer flex gap-2 text-[#808080] items-center hover:text-blue-300"
                      onClick={() => handleUpdateStatus(currentInquiryStatus?.nextStatus, record)}
                    >
                      <IconArrowRight width={28} height={28} />
                      <span className="text-lg text-black hover:text-blue-300">
                    {`${currentInquiryStatus?.nextStatus}${LIST_INQUIRIES_NAME_SPACES.NEXT_STATUS}`}
                  </span>
                    </div>
                  )}
                </div>
              )
            }
          >
            <div
              style={stylesCss}
              className="border rounded-3xl py-1 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {statusDisplay}
            </div>
          </Popconfirm>
        );
      }
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_DATE.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_DATE.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_DATE.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: true,
      render: (_, record: any) => {
        return <div>{
          record?.updatedAt
            ? formatTime(record?.updatedAt, SPLASH_REVERSED_DATE_FORMAT)
            : formatTime(record?.createdAt, SPLASH_REVERSED_DATE_FORMAT)
        }</div>;
      }
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: true,
      render: (_, record: any) => (
        <span>{record?.fields?.important?.ja}</span>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: true,
      render: (_, record: any) => (
        <span>{record?.fields?.urgency?.ja}</span>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.dataIndex,
      key: LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: true,
      render: (_, record: any) => (
        <span>{record?.fields?.priority?.ja}</span>
      )
    }
  ];
  return (
    <>
      <InquiryFilterComponent
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
        customerId={customerId}
        setCustomerId={setCustomerId}
        isLoadingDropdown={isLoadingDropdown}
        customerOptions={customerOptions}
      />
      <TableComponent
        tableData={tableData}
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        tableName="inquiry_page_table"
      />
    </>
  );
}

export default InquiryContainer;
