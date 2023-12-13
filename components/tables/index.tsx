import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import cx from 'classnames';
import styles from './table.module.scss';

const CustomTable: React.FC<{
  columns: any[];
  data: any[];
  isShowTotal?: boolean;
  showSizeChanger?: any;
  tableName?: any;
  rowKey?: any;
  showQuickJumper?: any;
  pagination?: any;
  position?: any;
  setPage?: any;
  setLimit?: any;
  onChange?: any;
  onRow?: any;
}> = ({
  columns,
  data,
  showSizeChanger,
  tableName,
  showQuickJumper,
  pagination,
  position,
  setPage,
  setLimit,
  onChange,
  onRow,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDataSource(data);
    }
  }, [data]);

  return (
    <div>
      <Table
        className={cx('antd-custom-table', styles.custom_table)}
        columns={columns}
        rowKey={(record) => record?.fields?.id}
        pagination={{
          showSizeChanger: !!showSizeChanger,
          showQuickJumper: !!showQuickJumper,
          defaultPageSize: pagination ? pagination.limit : 10,
          current: pagination ? pagination.page : 1,
          total: pagination ? pagination.total : data ? data.length : 0,
          pageSizeOptions: ['10', '20', '50'],
          position: [position ? position : 'bottomRight'],
          size: 'default',
          onChange: (pNumber, pSize) => {
            if (pagination.limit) setLimit(pSize);
            if (pagination.page) setPage(pNumber);
          },
        }}
        onChange={onChange}
        onRow={onRow}
        dataSource={dataSource}
      />
    </div>
  );
};

export default CustomTable;
