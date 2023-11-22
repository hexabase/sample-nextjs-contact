import styles from "@/containers/DetailInquiry/formEdit/styles.module.scss";
import { DatePicker, Form, Input, Select } from "antd";
import { SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import optionStatus, { inquiryImportance, inquiryPriority, inquiryUrgency } from "@/common/constants/params";
import React from "react";


interface Props {
  isEdit?: boolean;
  form: any;
  onFinish: any;
}

const InquiryFormData = (props: Props) => {
  const {
    form,
    isEdit,
    onFinish,
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
            <Form.Item label="対応期限" name="task_due_date">
              <DatePicker
                className="w-60"
                size="large"
                placeholder=""
                format={SPLASH_REVERSED_DATE_FORMAT}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="担当者" name="pic">
              <Input className="w-60" size="large" />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label="ステータス" name="status">
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
            <Form.Item label="重要度" name="important">
              <Select
                className="!w-60"
                size="large"
                options={inquiryImportance}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="緊急度" name="urgency">
              <Select
                className="!w-60"
                size="large"
                options={inquiryUrgency}
              />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label="優先度" name="priority">
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
