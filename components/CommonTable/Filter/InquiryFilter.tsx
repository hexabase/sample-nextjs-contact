import { Button, Form, Input, Select, Spin } from "antd";
import styles from "@/components/CommonTable/styles.module.scss";
import { LIST_INQUIRIES_NAME_SPACES } from "@/common/constants/namespaces";
import optionStatus from "@/common/constants/params";
import IconSearch from "@/components/icons/IconSearch";
import Router from "next/router";
import { APP_ROUTES } from "@/common/constants/routes";
import IconPlus from "@/components/icons/IconPlus";
import React from "react";
import { filterOption } from "@/utils";

interface Props {
  payloadGet: any,
  setPayloadGet: any,
  setCustomerId: any,
  customerOptionValue: any,
  customerOptions: any,
  isLoadingDropdown: boolean,
}

const InquiryFilterComponent = (props: Props) => {
  const {
    payloadGet,
    setPayloadGet,
    setCustomerId,
    customerOptionValue,
    customerOptions,
    isLoadingDropdown,
  } = props;
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    const conditions = [];
    if (values?.customerId) {
      setCustomerId(values?.customerId);
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
  return (
    <div className="flex items-center justify-between mb-5">
      <Form
        form={form}
        className={styles.formFilter}
        layout="inline"
        size="large"
        onFinish={handleFinish}
        initialValues={{
          customerId: customerOptionValue
        }}
      >
        <Spin spinning={isLoadingDropdown}>
          <Form.Item name="customerId">
            <Select
              className="!w-60"
              allowClear
              showSearch
              optionFilterProp="children"
              value={customerOptionValue}
              placeholder={LIST_INQUIRIES_NAME_SPACES.COMPANY_NAME_PLACEHOLDER}
              filterOption={filterOption}
              options={customerOptions}
            />
          </Form.Item>
        </Spin>
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
        <Button className={styles.btnNew} size="large" onClick={
          () => Router.push(APP_ROUTES.CREATE_INQUIRY)
        }>
          <IconPlus />
          {LIST_INQUIRIES_NAME_SPACES.BTN_CREATE}
        </Button>
      </div>
    </div>
  );
};

export default InquiryFilterComponent;
