import { Button, Modal } from "antd";
import React from "react";
import iconWarning from "@/public/images/iconWarning.png";

import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { APP_ROUTES } from "@/common/constants/routes";
import { inquiryServiceApi } from "@/services/inquiry-service";
import { toast } from "react-toastify";

interface Props {
  showModalDel?: boolean;
  setShowModalDel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalDelete(props: Props) {
  const { showModalDel, setShowModalDel } = props;
  const { deleteInquiry } = inquiryServiceApi;

  const router = useRouter();
  const handleSubmit = () => {
    deleteInquiry({}, router.query.id)
      .then(_ => router.push(APP_ROUTES.LIST_INQUIRY))
      .catch(err => {
        setShowModalDel?.(false);
        toast.error(err?.data?.message || "Something went wrong");
      });
  };

  const handleCancel = () => {
    setShowModalDel?.(false);
  };
  return (
    <Modal
      className={styles.modal}
      open={showModalDel}
      centered
      closable={false}
      footer={false}
    >
      <div className="flex justify-center">
        <Image src={iconWarning} alt="warning" width={80} height={80} />
      </div>
      <div className="text-2xl font-semibold my-6 text-center">
        削除してもよろしいですか？
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button
          size="large"
          className={styles.btnCancel}
          onClick={handleCancel}
        >
          キャンセル
        </Button>
        <Button size="large" className={styles.btnOk} onClick={handleSubmit}>
          削除
        </Button>
      </div>
    </Modal>
  );
}

export default ModalDelete;
