import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';

import styles from './styles.module.scss';
import IconPlus from '../icons/IconPlus';
import IconCheck from '../icons/IconCheck';
import IconTrash from '../icons/IconTrash';
import IconEdit from '../icons/IconEdit';

interface Props {
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
  setShowModalDel?: React.Dispatch<React.SetStateAction<boolean>>;
}

function TopPageDetailInquiry(props: Props) {
  const { isEdit, setIsEdit, setShowModalDel } = props;

  const handleEdit = () => {
    setIsEdit?.(true);
  };
  const handleCancelEdit = () => {
    setIsEdit?.(false);
  };

  const handleShowModalDel = () => {
    setShowModalDel?.(true);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="text-3xl font-bold -mt-6">タイトル</div>
      <div className="flex items-center gap-2">
        {!isEdit && (
          <Button
            size="large"
            className={classNames('flex gap-2 items-center', styles.btnDefault)}
            onClick={handleEdit}
          >
            <IconEdit />
            編集
          </Button>
        )}
        {isEdit && (
          <Button
            size="large"
            className={classNames('flex gap-2 items-center', styles.btnDefault)}
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
            className={classNames('flex gap-2 items-center', styles.btnPrimary)}
          >
            <IconCheck />
            完了
          </Button>
        )}

        <Button
          size="large"
          disabled={isEdit}
          onClick={handleShowModalDel}
          className={classNames(
            'flex gap-2 items-center',
            isEdit ? styles.btnDelDisabled : styles.btnDel
          )}
        >
          <IconTrash />
          削除
        </Button>
      </div>
    </div>
  );
}

export default TopPageDetailInquiry;
