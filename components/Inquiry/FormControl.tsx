import { Button } from "antd";
import classNames from "classnames";
import styles from "./styles.module.scss";
import IconEdit from "@/components/icons/IconEdit";
import IconPlus from "@/components/icons/IconPlus";
import IconCheck from "@/components/icons/IconCheck";
import IconTrash from "@/components/icons/IconTrash";
import React from "react";
import { DETAIL_INQUIRY_NAME_SPACES } from "@/common/constants/namespaces";

interface Props {
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
  setShowModalDel?: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelEdit: any,
  form: any,
  data: any,
}

const FormControl = (props: Props) => {
  const {
    isEdit,
    setIsEdit,
    handleCancelEdit,
    form,
    data,
    setShowModalDel
  } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold -mt-6">{data?.Title}</div>
      <div className="flex items-center gap-2">
        {!isEdit && (
          <Button
            size="large"
            className={classNames("flex gap-2 items-center", styles.btnDefault)}
            onClick={() => setIsEdit?.(true)}
          >
            <IconEdit />
            {DETAIL_INQUIRY_NAME_SPACES.OPEN_EDIT_BTN}
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
            {DETAIL_INQUIRY_NAME_SPACES.CANCEL_EDIT_BTN}
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
            {DETAIL_INQUIRY_NAME_SPACES.SUBMIT_EDIT_BTN}
          </Button>
        )}

        <Button
          size="large"
          disabled={isEdit}
          onClick={() => setShowModalDel?.(true)}
          className={classNames(
            "flex gap-2 items-center",
            isEdit ? styles.btnDelDisabled : styles.btnDel
          )}
        >
          <IconTrash />
          {DETAIL_INQUIRY_NAME_SPACES.DELETE_BTN}
        </Button>
      </div>
    </div>
  );
};

export default FormControl;
