import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm, Select, Spin, Tooltip } from "antd";

import styles from "./styles.module.scss";
import Router from "next/router";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";
import { inquiryServiceApi } from "@/services/inquiry-service";
import { formatTime } from "@/utils";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import optionStatus, { DEFAULT_PARAM_SEARCH, inquiryStatus, inquiryStatusParams } from "@/common/constants/params";
import CustomTable from "@/components/tables";
import { LIST_INQUIRIES_NAME_SPACES } from "@/common/constants/namespaces";
import Link from "next/link";
import { APP_ROUTES } from "@/common/constants/routes";
import { ListInquiriesDataType, listInquiriesPayloadDataType } from "@/common/param-types";
import { ColumnsType } from "antd/es/table";
import IconSearch from "@/components/icons/IconSearch";
import IconPlus from "@/components/icons/IconPlus";
import { customersServiceApi } from "@/services/customer-service";
import { useCustomerIdStore } from "@/hooks/useCustomerId";


function TableInquiry() {
  const [form] = Form.useForm();

  const { getListInquiry, updateInquiry } = inquiryServiceApi;
  const { getListCustomer } = customersServiceApi;
  const { globalCustomerId, setGlobalCustomerId } = useCustomerIdStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any>();
  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.per_page,
    page: DEFAULT_PARAM_SEARCH.page,
    total: tableData?.totalItems | 0
  });
  const [customerId, setCustomerId] = useState<string | any>(globalCustomerId);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [companyOptionValue, setCompanyOptionValue] = useState<any>([]);

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
    setCompanyOptions(options);
  };

  useEffect(() => {
    setLoading(true);
    getListInquiry(payloadGet).then(r => {
      setTableData(r);
      setLoading(false);
    });
  }, [payloadGet]);

  useEffect(() => {
    const companyObject = companyOptions.find((item) => {
      return item?.value === customerId;
    });
    setCompanyOptionValue(companyObject?.value);
  }, [customerId, companyOptions]);

  const handleFinish = (values: any) => {
    const conditions = [];
    if (values?.customerId) {
      setCustomerId(customerId);
      conditions.push(
        {
          "conditions": [
            { "id": "customer_id", "search_value": [`${values?.customerId}`] }
          ]
        }
      );
    }
    if (values?.statusDropdown) {
      const statusConditions: { id: string; search_value: string[]; }[] = [];
      values?.statusDropdown.forEach((item: any) => {
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
    if (values?.keywordSearch) {
      conditions.push(
        {
          "conditions": [
            { "id": "Title", "search_value": [`${values?.keywordSearch}`] }
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

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
      <Spin spinning={loading}>
        <div className="flex items-center justify-between mb-5">
          <Form
            form={form}
            className={styles.formFilter}
            layout="inline"
            size="large"
            onFinish={handleFinish}
            initialValues={{
              customerId: companyOptionValue
            }}
          >
            <Form.Item name="customerId">
              <Select
                className="!w-60"
                allowClear
                placeholder={LIST_INQUIRIES_NAME_SPACES.COMPANY_NAME_PLACEHOLDER}
                filterOption={filterOption}
                // defaultValue={companyOptionValue}
                options={companyOptions}
              />
            </Form.Item>
            <Form.Item name="keywordSearch">
              <Input
                placeholder={LIST_INQUIRIES_NAME_SPACES.SEARCH_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item name="statusDropdown">
              <Select
                className="!w-48"
                mode="multiple"
                popupClassName={styles.popup}
                options={optionStatus}
                allowClear
                placeholder={LIST_INQUIRIES_NAME_SPACES.STATUS_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                className={styles.btnSearch}
                htmlType="submit"
              >
                <IconSearch />
                {LIST_INQUIRIES_NAME_SPACES.BTN_SEARCH}
              </Button>
            </Form.Item>
          </Form>
          <div>
            <Button className={styles.btnNew} size="large" onClick={() => Router.push(APP_ROUTES.CREATE_INQUIRY)}>
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
      </Spin>
    </>
  );
}

export default TableInquiry;
