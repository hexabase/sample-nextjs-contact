import type { PaginationProps } from 'antd';
import { Pagination as PaginationAntd } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';

import { DEFAULT_SIZE, PAGE_SIZE_OPTIONS } from '@/common/constants/params';
import styles from './styles.module.scss';

interface CustomPaginationProps extends PaginationProps {
  setPaginate: (paginate: { limit: number; offset: number }) => void;
  recordPerPage?: number;
  currentPage?: number;
  showTotal?: any;
  className?: Class;
}

export type Class = 'pagination-common' | 'pagination-mini';

const Pagination = (props: CustomPaginationProps) => {
  const {
    className = 'pagination-common',
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    pageSize = DEFAULT_SIZE,
    total = 0,
    setPaginate,
    currentPage,
    showSizeChanger = true,
    showQuickJumper = true,
    ...restProps
  } = props;

  const onChange = (page: number, pageSizeNumber: number) => {
    setPaginate({ offset: page, limit: pageSizeNumber });
  };

  if (total <= pageSize) {
    return null;
  }

  return (
    <div className={classNames(className, 'flex items-center')}>
      <PaginationAntd
        {...restProps}
        current={currentPage}
        onChange={onChange}
        onShowSizeChange={onChange}
        defaultPageSize={pageSize}
        total={total}
        // pageSizeOptions={pageSizeOptions}
        // showSizeChanger={showSizeChanger}
        showLessItems={true}
        showQuickJumper
        locale={{
          items_per_page: '/ ページ',
        }}
      />
    </div>
  );
};

export default Pagination;
