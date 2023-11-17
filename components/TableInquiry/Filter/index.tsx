import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';

import styles from '../styles.module.scss';
import IconSearch from '@/components/icons/IconSearch';
import IconPlus from '@/components/icons/IconPlus';
import Router from "next/router";
import { APP_ROUTES } from "@/common/constants/routes";

function FilterTableInquiry() {
  const [form] = Form.useForm();
  const [selectedOptions, setSelectedOptions] = useState<Array<any>>([]);

  const optionStatus = [
    { value: '新規', label: '新規' },
    { value: '受付', label: '受付' },
    { value: '作業中', label: '作業中' },
    { value: '確認', label: '確認' },
    { value: '完了', label: '完了' },
  ];
  return (
    <div className="flex items-center justify-between mb-5">
      <Form
        form={form}
        className={styles.formFilter}
        layout="inline"
        size="large"
      >
        <Form.Item>
          <Select className="!w-60" allowClear placeholder="サンプル株式会社" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="フリーワード検索" />
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
                const newSelectedOption = selectedOptions;
                setSelectedOptions(newSelectedOption);
              }
            }}
            allowClear
            placeholder="ステータス"
            optionRender={(option: any) => (
              <Space>
                <Checkbox checked={selectedOptions.includes(option.value)} />
                {option.label}
              </Space>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="default" className={styles.btnSearch} htmlType="submit">
            <IconSearch />
            検索
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Button className={styles.btnNew} size="large" onClick={() => {Router.push(APP_ROUTES.CREATE_INQUIRY)}}>
          <IconPlus />
          追加
        </Button>
      </div>
    </div>
  );
}

export default FilterTableInquiry;
