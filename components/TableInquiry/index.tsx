import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Popconfirm, Select, Space, Tooltip } from "antd";

import styles from "./styles.module.scss";
import Router, { useRouter } from "next/router";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";
import { useQuery } from "@tanstack/react-query";
import { inquiryServiceApi } from "@/services/inquiry-service";
import { formatTime } from "@/utils";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import optionStatus, {
  DEFAULT_PARAM_SEARCH,
  inquiryStatus,
  inquiryStatusParams
} from "@/common/constants/params";
import CustomTable from "@/components/tables";
import { LIST_INQUIRIES_NAME_SPACES } from "@/common/constants/namespaces";
import Link from "next/link";
import { APP_ROUTES } from "@/common/constants/routes";
import {
  ListInquiriesDataType,
  listInquiriesPayloadDataType
} from "@/common/param-types";
import { ColumnsType } from "antd/es/table";
import IconSearch from "@/components/icons/IconSearch";
import IconPlus from "@/components/icons/IconPlus";
import { customersServiceApi } from "@/services/customer-service";
import { useCustomerIdStore } from "@/hooks/useCustomerId";


function TableInquiry() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { query } = router;

  const [tableData, setTableData] = useState<any>();
  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalItems | 0
  });

  const { getListInquiry, updateInquiry } = inquiryServiceApi;
  const { setGlobalCustomerId } = useCustomerIdStore();

  const [selectedOptions, setSelectedOptions] = useState<Array<any>>([]);
  const [customerId, setCustomerId] = useState<string | any>(query?.customer_id);
  const [keywordSearch, setKeywordSearch] = useState<any>();
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

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

  useQuery({
    queryKey: ["inquiries", { payloadGet }],
    queryFn: () => getListInquiry(payloadGet),
    onSuccess: (data) => setTableData(data)
  });

  const handleOnClick = () => {
    Router.push(APP_ROUTES.CREATE_INQUIRY);
  };

  const handleSubmit = () => {
    const conditions = [];
    if (customerId) {
      conditions.push(
        {
          "conditions": [
            { "id": "customer_id", "search_value": [`${customerId}`] }
          ]
        }
      );
    }
    if (selectedOptions) {
      const statusConditions: { id: string; search_value: string[]; }[] = [];
      selectedOptions.forEach((item) => {
        statusConditions.push({
          "id": "status", "search_value": [`${item}`]
        });
      });
      conditions.push(
        {
          "conditions": statusConditions,
          "use_or_condition": true
        }
      );
    }
    if (keywordSearch) {
      conditions.push(
        {
          "conditions": [
            { "id": "Title", "search_value": [`${keywordSearch}`] }
          ]
        }
      );
    }

    setPayloadGet({
      ...payloadGet,
      conditions: conditions,
      use_or_condition: false
    });
  };

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

  const setPage = (page: number) => {
    const tempPagination = { ...pagination };
    tempPagination.page = page;
    setPagination(tempPagination);
  };

  const setLimit = (limit: number) => {
    const tempPagination = { ...pagination };
    tempPagination.limit = limit;
    setPagination(tempPagination);
  };

  const onClickRow = (record: ListInquiriesDataType) => {
    return APP_ROUTES.DetailInquiry(record.i_id);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const dropdownPayload = {
    "page": pagination.page,
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
        value: item?.i_id,
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
          <Link href={onClickRow(record)}>{text}</Link>
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
    <div>
      <div className="flex items-center justify-between mb-5">
        <Form
          form={form}
          className={styles.formFilter}
          layout="inline"
          size="large"
        >
          <Form.Item name="companyDropdown">
            <Select
              className="!w-60"
              allowClear
              placeholder={LIST_INQUIRIES_NAME_SPACES.COMPANY_NAME_PLACEHOLDER}
              filterOption={filterOption}
              options={dropdownOptions}
              onSelect={(value) => {
                setCustomerId(value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder={LIST_INQUIRIES_NAME_SPACES.SEARCH_PLACEHOLDER}
              onChange={(e) => setKeywordSearch(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Select
              className="!w-48"
              mode="multiple"
              popupClassName={styles.popup}
              options={optionStatus}
              onSelect={(value) =>
                setSelectedOptions([...selectedOptions, value])
              }
              onDeselect={(value) => {
                const itemDeselected = selectedOptions.find(
                  (opt: string) => opt === value
                );
                const idxItemDeselected = selectedOptions.findIndex(
                  (opt: string) => opt === value
                );
                if (itemDeselected) {
                  selectedOptions.splice(idxItemDeselected, 1);
                  setSelectedOptions(selectedOptions);
                }
              }}
              allowClear
              placeholder={LIST_INQUIRIES_NAME_SPACES.STATUS_PLACEHOLDER}
              optionRender={(option: any) => (
                <Space>
                  <Checkbox checked={selectedOptions.includes(option.value)} />
                  {option.label}
                </Space>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              className={styles.btnSearch}
              htmlType="submit"
              onClick={handleSubmit}
            >
              <IconSearch />
              {LIST_INQUIRIES_NAME_SPACES.BTN_SEARCH}
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Button className={styles.btnNew} size="large" onClick={handleOnClick}>
            <IconPlus />
            {LIST_INQUIRIES_NAME_SPACES.BTN_CREATE}
          </Button>
        </div>
      </div>
      <CustomTable
        columns={columns}
        data={tableData?.items}
        pagination={pagination}
        setPage={setPage}
        setLimit={setLimit}
        tableName="inquiry-page-table"
        rowKey={(record: any) => record.id}
        showQuickJumper={true}
      />

    </div>
  );
}

export default TableInquiry;
