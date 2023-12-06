import { inquiryStatus, PARAM_TOP_BAR_TITLE } from '@/common/constants/params';
import { useTopBarStore } from '@/hooks/useTopBar';
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Spin } from 'antd';
import { CREATE_INQUIRY_NAME_SPACES } from '@/common/constants/namespaces';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/common/constants/routes';
import styles from '../styles.module.scss';
import { CreateItemParameters } from '../../../common/libs/types';
import { useCustomerIdStore } from '@/hooks/useCustomerId';
import Cookies from 'js-cookie';
import { COOKIES_KEY } from '@/common/constants/cookie';
import { inquiryServiceApi } from '@/services/inquiry-service';
import { toast } from 'react-toastify';

function CreateInquiryContainer() {
  const { setTitle } = useTopBarStore();
  const { globalCustomerId } = useCustomerIdStore();
  const [titleValue, setTitleValue] = useState('');
  const [deadlineValue, setDeadlineValue] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState('');
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => setTitle(PARAM_TOP_BAR_TITLE.CREATE_INQUIRY_PAGE), []);

  const defaultStatus = inquiryStatus.find((obj: any) => {
    return !obj.previousStatus;
  });
  const { createInquiry } = inquiryServiceApi;
  const onFinish = (values: any) => {
    const payload: CreateItemParameters = {
      payload: {
        item: {
          Title: values?.title,
          content: values?.content,
          customer_id: globalCustomerId,
          status: defaultStatus?.id,
          system_due_date: deadlineValue,
          user_id: Cookies.get(COOKIES_KEY.USER_ID),
        },
      },
    };
    createInquiry(payload)
      .then((_) => {
        setIsLoading(true);
        router.push(APP_ROUTES.LIST_INQUIRY);
      })
      .catch((err) => {
        toast.error(
          err?.data?.errors[0]?.description || 'Something went wrong',
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          }
        );
      });
  };

  return (
    <div className={styles.create_inquiry_form}>
      <Spin spinning={isLoading}>
        <Row className="mt-4">
          <Col span={24}>
            <Form
              form={form}
              onFinish={onFinish}
              className="form-label-align-left"
              labelCol={{
                span: 24,
              }}
              autoComplete="off"
            >
              <Row className="mb-4 flex justify-between">
                <Col span={19}>
                  <Form.Item
                    label={CREATE_INQUIRY_NAME_SPACES.TITLE_LABEL.title}
                    name={CREATE_INQUIRY_NAME_SPACES.TITLE_LABEL.dataKey}
                    rules={[{ required: true }, { max: 255 }]}
                  >
                    <Input
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label={CREATE_INQUIRY_NAME_SPACES.DEADLINE_LABEL.title}
                    name={CREATE_INQUIRY_NAME_SPACES.DEADLINE_LABEL.dataKey}
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      className="w-full"
                      onChange={(date, dateString) => setDeadlineValue(date)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col span={24}>
                  <Form.Item
                    label={CREATE_INQUIRY_NAME_SPACES.CONTENT_LABEL.title}
                    name={CREATE_INQUIRY_NAME_SPACES.CONTENT_LABEL.dataKey}
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      value={contentValue}
                      onChange={(e) => setContentValue(e.target.value)}
                      autoSize={{ minRows: 12 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col
                  span={24}
                  className="flex justify-center items-center gap-2"
                >
                  <Form.Item>
                    <Button
                      className="btn cancel"
                      onClick={() => {
                        router.push(APP_ROUTES.LIST_INQUIRY);
                      }}
                    >
                      {CREATE_INQUIRY_NAME_SPACES.CANCEL_BTN}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" className="btn submit">
                      {CREATE_INQUIRY_NAME_SPACES.SUBMIT_BTN}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default CreateInquiryContainer;
