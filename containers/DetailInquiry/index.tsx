import { useTopBarStore } from "@/hooks/useTopBar";
import React, { useEffect, useState } from "react";
import ModalDelete from "@/components/ModalDelete";
import CommentComponent from "./componentComment";
import { useRouter } from "next/router";
import { detailInquiryPayloadDataType } from "@/common/param-types";
import { inquiryServiceApi } from "@/services/inquiry-service";
import optionStatus from "@/common/constants/params";
import { Form, Spin } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@/common/constants/routes";
import FormControl from "@/components/Inquiry/FormControl";
import BasicInquiryInformation from "@/components/Inquiry/BasicInquiryInformation";
import InquiryFormData from "@/components/Inquiry/InquiryFormData";

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
  const [isFetching, setIsFetching] = useState<boolean>(false);
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

  function getFieldValue(dataFields: any[] | undefined, fieldId: string) {
    return dataFields?.find((obj: any) => obj.field_id === fieldId);
  }

  const extractData = (requestData: any) => {
    setData(requestData);
    const dataFields = requestData?.field_values;
    const {
      system_due_date,
      content,
      task_due_date,
      pic,
      important,
      urgency,
      priority,
      status
    } = {
      system_due_date: getFieldValue(dataFields, "system_due_date"),
      content: getFieldValue(dataFields, "content"),
      task_due_date: getFieldValue(dataFields, "task_due_date"),
      pic: getFieldValue(dataFields, "pic"),
      important: getFieldValue(dataFields, "important"),
      urgency: getFieldValue(dataFields, "urgency"),
      priority: getFieldValue(dataFields, "priority"),
      status: getFieldValue(dataFields, "status")
    };

    setSystemDueDate(system_due_date);
    setContent(content);
    setTaskDueDate(task_due_date);
    setPic(pic);
    setImportant(important);
    setUrgency(urgency);
    setPriority(priority);
    setStatus(status);
  };

  useEffect(() => {
    setIsLoading(true);
    getInquiry(payloadGet, router.query.id)
      .then(r => extractData(r))
      .catch((err) => {
        toast.error(
          err?.data?.errors[0]?.description || "Something went wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
          }
        );
        router.push(APP_ROUTES.LIST_INQUIRY).then();
      })
      .finally(() => setIsLoading(false));
  }, [payloadGet, isFetching]);

  useEffect(() => {
    form.setFieldsValue({
      task_due_date: taskDueDate?.value ? moment(taskDueDate?.value, "YYYY-MM-DD") : undefined,
      pic: pic?.value,
      status: status?.value,
      important: important?.value,
      urgency: urgency?.value,
      priority: priority?.value
    })
  }, [extractData]);

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
    updateInquiry(payload, router.query.id).then(r => {
      setIsEdit(false);
      setIsFetching(!isFetching);
    });
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setIsFetching(!isFetching);
  };
  return (
    <>
      <div className="">
        <FormControl
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleCancelEdit={handleCancelEdit}
          form={form}
          setShowModalDel={setShowModalDel}
        />

        <Spin spinning={isLoading}>
          <BasicInquiryInformation
            data={data}
            systemDueDate={systemDueDate}
            content={content}
          />

          <InquiryFormData
            isEdit={isEdit}
            form={form}
            onFinish={onFinish}
          />
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
