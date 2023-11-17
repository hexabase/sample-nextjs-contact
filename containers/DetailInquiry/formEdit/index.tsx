import { DatePicker, Form, Input, Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import styles from './styles.module.scss';

interface Props {
  isEdit?: boolean;
}

function FormEditData(props: Props) {
  const { isEdit } = props;
  const [form] = Form.useForm();

  const optionSelect = [
    { value: 1, label: '高' },
    { value: 2, label: '中' },
    { value: 3, label: '低' },
  ];

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      form={form}
      disabled={!isEdit}
      className={styles.form}
      initialValues={{
        date: dayjs(new Date()),
        manager: 'your name',
        status: 1,
        importance: 1,
        urgency: 2,
        priority: 3,
      }}
    >
      <div className="w-full flex gap-6 ">
        <div className="w-1/2">
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="対応期限" colon={false} name="date">
              <DatePicker className="w-60" size="large" />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="担当者" colon={false} name="manager">
              <Input className="w-60" size="large" />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label="ステータス" name="status" colon={false}>
              <Select className="!w-60" size="large" options={optionSelect} />
            </Form.Item>
          </div>
        </div>
        <div className="w-1/2">
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="重要度" name="importance" colon={false}>
              <Select className="!w-60" size="large" options={optionSelect} />
            </Form.Item>
          </div>
          <div className="py-1 border-t-2 border-t-[#E6E6E6]">
            <Form.Item label="緊急度" name="urgency" colon={false}>
              <Select className="!w-60" size="large" options={optionSelect} />
            </Form.Item>
          </div>
          <div className="py-1 border-y-2 border-y-[#E6E6E6]">
            <Form.Item label="優先度" name="priority" colon={false}>
              <Select className="!w-60" size="large" options={optionSelect} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default FormEditData;
