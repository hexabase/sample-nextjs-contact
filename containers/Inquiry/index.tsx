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
import Link from "next/link";
import { APP_ROUTES } from "@/common/constants/routes";
import { ListInquiriesDataType, listInquiriesPayloadDataType } from "@/common/param-types";
import { ColumnsType } from "antd/es/table";
import { customersServiceApi } from "@/services/customer-service";
import { useCustomerIdStore } from "@/hooks/useCustomerId";
import TableComponent from "@/components/CommonTable";
import InquiryFilterComponent from "@/components/CommonTable/Filter/InquiryFilter";
import { useTopBarStore } from "@/hooks/useTopBar";


function InquiryContainer() {
  const { setTitle } = useTopBarStore();
  useEffect(() => setTitle(PARAM_TOP_BAR_TITLE.INQUIRY_PAGE), []);
  const { getListInquiry, updateInquiry } = inquiryServiceApi;
  const { getListCustomer } = customersServiceApi;
  const { globalCustomerId, setGlobalCustomerId } = useCustomerIdStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any>();
  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalItems | 0
  });
  const [customerId, setCustomerId] = useState<string | any>(globalCustomerId);
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [customerOptionValue, setCustomerOptionValue] = useState<any>([]);

  const [
    payloadGet, setPayloadGet
  ] = useState<listInquiriesPayloadDataType>({
    page: pagination.page,
    per_page: pagination.limit,
    use_display_id: true,
    return_number_value: true,
    conditions: [
      {
        "conditions": [
          { "id": "customer_id", "search_value": [`${customerId}`] }
        ]
      }
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
        setCustomerId(response?.items?.[0]?.i_id);
      }
    });
  }, []);

  const setDropdownData = (data: any) => {
    const options: any[] = [];
    data?.items.forEach((item: any) => {
      options.push({
        value: item?.i_id,
        label: item?.company_name
      });
    });
    setCustomerOptions(options);
  };

  useEffect(() => {
    setIsLoading(true);
    getListInquiry(payloadGet).then(r => {
      setTableData(r);
      setIsLoading(false);
    });
  }, [payloadGet]);

  useEffect(() => {
    const tempPagination = { ...pagination };
    tempPagination.total = tableData?.totalItems;
    setPagination(tempPagination);
  }, [tableData]);

  useEffect(() => {
    const customerObject = customerOptions.find((item) => {
      return item?.value === customerId;
    });
    setCustomerOptionValue(customerObject?.value);
  }, [customerId, customerOptions]);

  const handleUpdateStatus = (status: any, itemId: string | number) => {
    const statusObject = inquiryStatus.find((obj: any) => {
      return obj.display === status;
    });
    const payload = {
      item: { status: statusObject?.id },
      is_force_update: true
    };
    updateInquiry(payload, itemId).then(_ => window.location.reload());
  };
  const columns: ColumnsType<ListInquiriesDataType> = [
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "20%",
      ellipsis: true,
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex]
      ),
      render: (text: string, record: any) => (
        <Tooltip title={text}>
          <Link href={APP_ROUTES.DetailInquiry(record.i_id)}>{text}</Link>
        </Tooltip>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "20%",
      ellipsis: true,
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_PIC.dataIndex]
      ),
      render: (text: string, record: any) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "10%",
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.dataIndex].localeCompare(b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_STATUS.dataIndex]),
      render: (_: string, record: any) => {
        const transformedStatus = inquiryStatusParams(record.status);
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
                      onClick={() => handleUpdateStatus(currentInquiryStatus?.previousStatus, record.i_id)}
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
                      onClick={() => handleUpdateStatus(currentInquiryStatus?.nextStatus, record.i_id)}
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
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_DATE.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_DATE.dataIndex]
      ),
      render: (_: string, record: any) => {
        return <div>{
          record?.updated_at
            ? formatTime(record?.updated_at, SPLASH_REVERSED_DATE_FORMAT)
            : formatTime(record?.created_at, SPLASH_REVERSED_DATE_FORMAT)
        }</div>;
      }
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_IMPORTANCE.dataIndex]
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_URGENCY.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_TITLE.dataIndex]
      )
    },
    {
      title: LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.title,
      dataIndex: LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.dataIndex,
      align: "center",
      showSorterTooltip: false,
      width: "12.5%",
      sorter: (a: any, b: any) => a?.[LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.dataIndex].localeCompare(
        b?.[LIST_INQUIRIES_NAME_SPACES.TABLE_PRIORITY.dataIndex]
      )
    }
  ];
  return (
    <>
      <InquiryFilterComponent
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
        setCustomerId={setCustomerId}
        customerOptionValue={customerOptionValue}
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
