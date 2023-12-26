import { useTopBarStore } from '@/hooks/useTopBar';
import React, { useEffect, useState } from 'react';
import ModalDelete from '@/components/ModalDelete';
import CommentComponent from '@/components/Inquiry/CommentBox';
import { useRouter } from "next/navigation";
import {
  detailInquiryPayloadDataType,
  TFieldValueConvert,
  UpdateItemParameters,
} from '@/common/libs/types';
import { inquiryServiceApi } from '@/services/inquiry-service';
import optionStatus from '@/common/constants/params';
import { Form, Spin } from 'antd';
import { toast } from 'react-toastify';
import { APP_ROUTES } from '@/common/constants/routes';
import FormControl from '@/components/Inquiry/FormControl';
import BasicInquiryInformation from '@/components/Inquiry/BasicInquiryInformation';
import InquiryFormData from '@/components/Inquiry/InquiryFormData';
import { DtItemDetail } from '@hexabase/hexabase-js/src/lib/types/item/response';
import dayjs from 'dayjs';

function DetailInquiry({ id }: { id: string }) {
  const [form] = Form.useForm();
  const { setTitle } = useTopBarStore();
  useEffect(() => setTitle(null), []);
  const router = useRouter();
  const { getInquiry, updateInquiry } = inquiryServiceApi;
  const [payloadGet, setPayloadGet] = useState<detailInquiryPayloadDataType>({
    format: 'map',
    include_linked_items: true,
    include_lookups: true,
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
  const [revNo, setRevNo] = useState<any>();
  const [status, setStatus] = useState<any>(optionStatus[0]);

  const extractData = (requestData: DtItemDetail) => {
    const dataFields = requestData?.getDatastoreItemDetails?.field_values;
    const dataConvert: TFieldValueConvert = {};

    Object.keys(dataFields).map((k) => {
      dataConvert[dataFields[k].field_id] = dataFields[k].value;
    });
    setData(requestData?.getDatastoreItemDetails);
    setRevNo(requestData?.getDatastoreItemDetails?.rev_no);

    setSystemDueDate(dataConvert?.system_due_date);
    setContent(dataConvert?.content);
    setTaskDueDate(dataConvert?.task_due_date);
    setPic(dataConvert?.pic);
    setImportant(dataConvert?.important);
    setUrgency(dataConvert?.urgency);
    setPriority(dataConvert?.priority);
    setStatus(dataConvert?.status);
  };

  useEffect(() => {
    setIsLoading(true);
    getInquiry(payloadGet, id)
      .then((r) => extractData(r))
      .catch((err) => {
        toast.error(
          err?.data?.errors[0]?.description || 'Something went wrong',
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          }
        );
        router.push(APP_ROUTES.LIST_INQUIRY);
      })
      .finally(() => setIsLoading(false));
  }, [payloadGet, isFetching]);

  //TODO: call api get author data
  // useEffect(() => {
  //   getUserInfo(userId)
  //     .then(r => setAuthor(r))
  // }, [userId]);

  useEffect(() => {
    form.setFieldsValue({
      task_due_date: taskDueDate ? dayjs(taskDueDate) : undefined,
      pic: pic,
      status: status,
      important: important,
      urgency: urgency,
      priority: priority,
    });
  }, [extractData]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModalDel, setShowModalDel] = useState<boolean>(false);
  const onFinish = (values: any) => {
    const payload: UpdateItemParameters = {
      itemActionParameters: {
        item: {
          status: values?.status,
          pic: values?.pic,
          important: values?.important,
          urgency: values?.urgency,
          priority: values?.priority,
          task_due_date: values?.task_due_date,
        },
        rev_no: revNo,
      },
      itemId: id,
    };
    updateInquiry(payload).then((r) => {
      setIsEdit(false);
      setIsLoading(true);
      router.push(APP_ROUTES.HOME);
    });
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setIsLoading(true);
    router.push(APP_ROUTES.HOME);
  };
  return (
    <>
      <FormControl
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleCancelEdit={handleCancelEdit}
        form={form}
        setShowModalDel={setShowModalDel}
        data={data}
      />

      <Spin spinning={isLoading}>
        <BasicInquiryInformation
          data={data}
          systemDueDate={systemDueDate}
        />

        <InquiryFormData isEdit={isEdit} form={form} onFinish={onFinish} />
      </Spin>

      <CommentComponent
        inquiryId={id}
      />
      <ModalDelete
        setShowModalDel={setShowModalDel}
        showModalDel={showModalDel}
        id={id}
      />
    </>
  );
}

export default DetailInquiry;
