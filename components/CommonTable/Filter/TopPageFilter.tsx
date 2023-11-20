import { DatePicker, Form, Select } from "antd";
import { TOP_PAGE_NAME_SPACES } from "@/common/constants/namespaces";
import cx from "classnames";
import styles from "@/containers/TopPage/styles.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { filterOption } from "@/utils";

interface Props {
  payloadGet: any,
  setPayloadGet: any,
  dropdownOptions: any,
}

const TopPageFilterComponent = (props: Props) => {
  const {
    payloadGet,
    setPayloadGet,
    dropdownOptions,
  } = props;
  const onFinish = (values: any) => {
    const conditions = [];
    if (values?.customerId) {
      conditions.push(
        {
          "conditions": [
            { "id": "id", "search_value": [`${values?.customerId}`] }
          ]
        }
      );
    }
    if (values?.searchDate) {
      conditions.push(
        {
          "conditions": [
            { "id": "updated_at", "search_value": [`${values?.searchDate}`] }
          ]
        }
      );
    }
    setPayloadGet({
      ...payloadGet,
      conditions: conditions,
      use_or_condition: false
    });
  }
  return (
      <Form
        className="flex justify-start items-center mb-5 gap-3"
        onFinish={onFinish}
      >
        <Form.Item
          className="w-1/5 mb-0"
          name="customerId"
        >
          <Select
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder={TOP_PAGE_NAME_SPACES.COMPANY_NAME_FILTER}
            filterOption={filterOption}
            options={dropdownOptions}
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
  )
}

export default TopPageFilterComponent;
