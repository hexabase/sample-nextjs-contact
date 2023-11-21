import { useTopBarStore } from "@/hooks/useTopBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatarDefault from "@/public/images/avatarDefault.png";
import ModalDelete from "@/components/ModalDelete";
import CommentComponent from "./componentComment";
import { useRouter } from "next/router";
import { detailInquiryPayloadDataType } from "@/common/param-types";
import { inquiryServiceApi } from "@/services/inquiry-service";
import { useQuery } from "@tanstack/react-query";
import { formatTime } from "@/utils";
import { NON_SECOND_DATETIME_FORMAT, SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import optionStatus, { inquiryImportance, inquiryPriority, inquiryUrgency } from "@/common/constants/params";
import styles from "@/containers/DetailInquiry/formEdit/styles.module.scss";
import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import classNames from "classnames";
import IconEdit from "@/components/icons/IconEdit";
import IconPlus from "@/components/icons/IconPlus";
import IconCheck from "@/components/icons/IconCheck";
import IconTrash from "@/components/icons/IconTrash";
import moment from "moment";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/common/constants/routes";

function DetailInquiry() {
  const [form] = Form.useForm();
  const { setTitle } = useTopBarStore();
  useEffect(() => setTitle(null), []);
  const router = useRouter();
  const { getInquiry, updateInquiry } = inquiryServiceApi;
  const [
    payloadGet, setPayloadGet
  ] = useState<detailInquiryPayloadDataType>({
    format: "map",
    include_linked_items: true,
    include_lookups: true
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [systemDueDate, setSystemDueDate] = useState<any>();
  const [content, setContent] = useState<any>();
  const [taskDueDate, setTaskDueDate] = useState<any>();
  const [pic, setPic] = useState<any>();
  const [important, setImportant] = useState<any>();
  const [urgency, setUrgency] = useState<any>();
  const [priority, setPriority] = useState<any>();
  const [status, setStatus] = useState<any>(optionStatus[0]);

  const parsedDate: any = moment(taskDueDate?.value);

  const extractData = (requestData: any) => {
    setData(requestData);
    const dataFields = requestData?.field_values;
    setSystemDueDate(dataFields?.find((obj: any) => {
      return obj.field_id === "system_due_date";
    }));
    setContent(dataFields?.find((obj: any) => {
      return obj.field_id === "content";
    }));
    setTaskDueDate(dataFields?.find((obj: any) => {
      return obj.field_id === "task_due_date";
    }));
    setPic(dataFields?.find((obj: any) => {
      return obj.field_id === "pic";
    }));
    setImportant(dataFields?.find((obj: any) => {
      return obj.field_id === "important";
    }));
    setUrgency(dataFields?.find((obj: any) => {
      return obj.field_id === "urgency";
    }));
    setPriority(dataFields?.find((obj: any) => {
      return obj.field_id === "priority";
    }));
    setStatus(dataFields?.find((obj: any) => {
      return obj.field_id === "status";
    }));
    setIsLoading(false);
  };

  useQuery({
    queryKey: ["inquiry", { payloadGet }],
    queryFn: () => getInquiry(payloadGet, router.query.id),
    onSuccess: (data) => extractData(data),
    onError: (err: any) => {
      toast.error(
        err?.data?.errors[0]?.description || "Something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000
        }
      );
      router.push(APP_ROUTES.LIST_INQUIRY).then();
    }
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModalDel, setShowModalDel] = useState<boolean>(false);
  const onFinish = (values: any) => {
    const payload = {
      item: {
        status: values?.status,
        pic: values?.pic,
        important: values?.important,
        urgency: values?.urgency,
        priority: values?.priority,
        task_due_date: values?.task_due_date
      },
      is_force_update: true
    };
    updateInquiry(payload, router.query.id).then(_ => window.location.reload());
  };
  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  const handleCancelEdit = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold -mt-6">タイトル</div>
          <div className="flex items-center gap-2">
            {!isEdit && (
              <Button
                size="large"
                className={classNames("flex gap-2 items-center", styles.btnDefault)}
                onClick={() => setIsEdit(true)}
              >
                <IconEdit />
                編集
              </Button>
            )}
            {isEdit && (
              <Button
                size="large"
                className={classNames("flex gap-2 items-center", styles.btnDefault)}
                onClick={handleCancelEdit}
              >
                <div className="rotate-45">
                  <IconPlus />
                </div>
                キャンセル
              </Button>
            )}
            {isEdit && (
              <Button
                size="large"
                className={classNames("flex gap-2 items-center", styles.btnPrimary)}
                onClick={() => {
                  form.submit();
                }}
              >
                <IconCheck />
                完了
              </Button>
            )}

            <Button
              size="large"
              disabled={isEdit}
              onClick={() => setShowModalDel(true)}
              className={classNames(
                "flex gap-2 items-center",
                isEdit ? styles.btnDelDisabled : styles.btnDel
              )}
            >
              <IconTrash />
              削除
            </Button>
          </div>
        </div>

        <Spin spinning={isLoading}>
          <div className="mt-5 flex gap-4">
            <Image src={avatarDefault} alt="avatar" width={56} height={56} />
            <div className="flex flex-col">
              <span className="font-bold text-lg">{data?.created_by}</span>
              <div className="flex gap-4">
            <span className="text-base">
              投稿日時 {formatTime(data?.created_at, NON_SECOND_DATETIME_FORMAT)}
            </span>
                <span className="text-base font-bold text-red-500">
              期限日 {formatTime(systemDueDate?.value, SPLASH_REVERSED_DATE_FORMAT)}
            </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4">
            {content?.value}
          </div>

          <Form
            form={form}
            disabled={!isEdit}
            className={styles.form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              task_due_date: taskDueDate?.value != "" ? parsedDate : "",
              pic: pic?.value,
              status: status?.value,
              important: important?.value,
              urgency: urgency?.value,
              priority: priority?.value
            }}
          >
            <div className="w-full flex gap-6 ">
              <div className="w-1/2">
                <div className="py-1 border-t-2 border-t-[#E6E6E6]">
                  <Form.Item label="対応期限" colon={false} name="task_due_date">
                    <DatePicker
                      className="w-60"
                      size="large"
                      placeholder=""
                      format={SPLASH_REVERSED_DATE_FORMAT}
                    />
                  </Form.Item>
                </div>
                <div className="py-1 border-t-2 border-t-[#E6E6E6]">
                  <Form.Item label="担当者" colon={false} name="pic">
                    <Input className="w-60" size="large" />
                  </Form.Item>
                </div>
                <div className="py-1 border-y-2 border-y-[#E6E6E6]">
                  <Form.Item label="ステータス" name="status" colon={false}>
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
                  <Form.Item label="重要度" name="important" colon={false}>
                    <Select
                      className="!w-60"
                      size="large"
                      options={inquiryImportance}
                    />
                  </Form.Item>
                </div>
                <div className="py-1 border-t-2 border-t-[#E6E6E6]">
                  <Form.Item label="緊急度" name="urgency" colon={false}>
                    <Select
                      className="!w-60"
                      size="large"
                      options={inquiryUrgency}
                    />
                  </Form.Item>
                </div>
                <div className="py-1 border-y-2 border-y-[#E6E6E6]">
                  <Form.Item label="優先度" name="priority" colon={false}>
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
        </Spin>
        {/*<FormEditData isEdit={isEdit} dataFields={dataFields} isSubmit={isSubmit} />*/}

        <CommentComponent inquiryId={router.query.id} pic={pic?.value} />
        <ModalDelete
          setShowModalDel={setShowModalDel}
          showModalDel={showModalDel}
        />
      </div>
    </>
  );
}

export default DetailInquiry;
