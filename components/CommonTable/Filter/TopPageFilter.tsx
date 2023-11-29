import { DatePicker, Form, Input } from "antd";
import { TOP_PAGE_NAME_SPACES } from "@/common/constants/namespaces";
import cx from "classnames";
import styles from "@/containers/TopPage/styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import React from "react";

interface Props {
  payloadGet: any,
  setPayloadGet: any,
}

const TopPageFilterComponent = (props: Props) => {
  const {
    payloadGet,
    setPayloadGet
  } = props;

  const onFinish = (values: any) => {
    const conditions = [];
    if (values?.customerName) {
      conditions.push(
        { "id": "company_name", "search_value": [`${values?.customerName}`] }
      );
    }
    if (values?.searchDate) {
      const startOfDay = values?.searchDate.startOf("day").toISOString();
      const endOfDay = values?.searchDate.endOf("day").toISOString();
      conditions.push(
        { "id": "updated_at", "search_value": [`${startOfDay}`, `${endOfDay}`] }
      );
    }
    setPayloadGet({
      ...payloadGet,
      conditions: conditions,
      use_or_condition: false
    });
  };
  return (
    <Form
      className="flex justify-start items-center mb-5 gap-3"
      onFinish={onFinish}
    >
      <Form.Item
        className="mb-0 w-1/5"
        name="customerName"
      >
        <Input
          allowClear
          placeholder={TOP_PAGE_NAME_SPACES.COMPANY_NAME_FILTER}
        />
      </Form.Item>
      <Form.Item
        className="w-1/5 mb-0"
        name="searchDate"
      >
        <DatePicker
          allowClear
          className="w-full"
          placeholder={TOP_PAGE_NAME_SPACES.UPDATED_AT_FILTER}
        />
      </Form.Item>

      <button className={cx(styles.submit_filter, "flex gap-1 items-center")}>
        <AiOutlineSearch />
        <span>{TOP_PAGE_NAME_SPACES.SUBMIT_FILTER}</span>
      </button>
    </Form>
  );
};

export default TopPageFilterComponent;
