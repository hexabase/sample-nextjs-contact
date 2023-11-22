import styles from "./styles.module.scss";
import { DatePicker, Form, Input, Select } from "antd";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import optionStatus, { inquiryImportance, inquiryPriority, inquiryUrgency } from "@/common/constants/params";
import React from "react";
import { DETAIL_INQUIRY_NAME_SPACES } from "@/common/constants/namespaces";


interface Props {
  isEdit?: boolean;
  form: any;
  onFinish: any;
}

const InquiryFormData = (props: Props) => {
  const {
    form,
    isEdit,
    onFinish
  } = props;
  return (
    <Form
      form={form}
      disabled={!isEdit}
      className={styles.form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className="w-full flex gap-6 ">
        <div className="w-1/2">
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.TASK_DUE_DATE_LABEL} name="task_due_date">
              <DatePicker
                className="w-60"
                size="large"
                placeholder=""
                format={SPLASH_REVERSED_DATE_FORMAT}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.PIC_LABEL} name="pic">
              <Input className="w-60" size="large" />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.STATUS_LABEL} name="status">
              <Select
                className="!w-60"
                size="large"
                options={optionStatus}
              />
            </Form.Item>
          </div>
        </div>
        <div className="w-1/2">
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.IMPORTANT_LABEL} name="important">
              <Select
                className="!w-60"
                size="large"
                options={inquiryImportance}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.URGENCY_LABEL} name="urgency">
              <Select
                className="!w-60"
                size="large"
                options={inquiryUrgency}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label={DETAIL_INQUIRY_NAME_SPACES.PRIORITY_LABEL} name="priority">
              <Select
                className="!w-60"
                size="large"
                options={inquiryPriority}
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default InquiryFormData;
