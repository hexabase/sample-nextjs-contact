'use client';

import { FC, useEffect, useState } from 'react';
import { useTopBarStore } from '@/hooks/useTopBar';
import {
  DEFAULT_PARAM_SEARCH,
  PARAM_TOP_BAR_TITLE,
} from '@/common/constants/params';
import TableComponent from '@/components/common_tables';
import type { ColumnsType } from 'antd/es/table';
import { HomePageDataType } from '@/common/libs/types';
import { TOP_PAGE_NAME_SPACES } from '@/common/constants/namespaces';
import { Tooltip } from 'antd';
import { APP_ROUTES } from '@/common/constants/routes';
import { customersServiceApi } from '@/services/customer-service';
import { formatTime } from '@/common/libs/functions';
import { SPLASH_REVERSED_DATE_FORMAT } from '@/common/constants/dateFormat';
import { useCustomerIdStore } from '@/hooks/useCustomerId';
import TopPageFilterComponent from '@/components/common_tables/filters/TopPageFilter';
import { GetItemsParameters } from '@hexabase/hexabase-js/src/lib/types/item/input';
import { redirect, useRouter } from 'next/navigation';

const TopPageContainer: FC = () => {
  // set title topBar
  const { setTitle } = useTopBarStore();
  const router = useRouter();
  useEffect(() => {
    setTitle(PARAM_TOP_BAR_TITLE.TOP_PAGE);
  }, []);

  const [tableData, setTableData] = useState<any>();
  const { setGlobalCustomerId } = useCustomerIdStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    limit: DEFAULT_PARAM_SEARCH.PER_PAGE,
    page: DEFAULT_PARAM_SEARCH.PAGE,
    total: tableData?.totalCount | 0,
  });

  const [payloadGet, setPayloadGet] = useState<GetItemsParameters>({
    page: pagination.page || 1,
    per_page: pagination.limit || 10,
    use_display_id: true,
    return_number_value: true,
  });

  useEffect(() => {
    setIsLoading(true);
    getListCustomer(payloadGet).then((r) => {
      setTableData(r);
      setIsLoading(false);
    });
  }, [payloadGet]);

  const { getListCustomer } = customersServiceApi;

  const columns: ColumnsType<HomePageDataType> = [
    {
      title: TOP_PAGE_NAME_SPACES.ID.title,
      dataIndex: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      key: TOP_PAGE_NAME_SPACES.ID.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: '15%',
      render: (_, record) => (
        <button
          className="w-full text-center"
          onClick={() => onClickRow(record)}
        >
          {record?.fields?.id}
        </button>
      ),
    },
    {
      title: TOP_PAGE_NAME_SPACES.COMPANY_NAME.title,
      dataIndex: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      key: TOP_PAGE_NAME_SPACES.COMPANY_NAME.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: '60%',
      render: (text, record) => (
        <Tooltip title={text}>
          <button
            className="w-full text-left"
            onClick={() => onClickRow(record)}
          >
            {record?.fields?.company_name}
          </button>
        </Tooltip>
      ),
    },
    {
      title: TOP_PAGE_NAME_SPACES.UPDATED_AT.title,
      dataIndex: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      key: TOP_PAGE_NAME_SPACES.UPDATED_AT.dataIndex,
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      width: '25%',
      render: (_, record) => (
        <span className="flex justify-center w-full">
          {record?.updatedAt
            ? formatTime(record?.updatedAt, SPLASH_REVERSED_DATE_FORMAT)
            : formatTime(record?.createdAt, SPLASH_REVERSED_DATE_FORMAT)}
        </span>
      ),
    },
  ];

  const onClickRow = (record: HomePageDataType) => {
    setGlobalCustomerId(record?.id);
    setIsLoading(true);
    router.push(APP_ROUTES.LIST_INQUIRY);
  };

  return (
    <>
      <TopPageFilterComponent
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
      />
      <TableComponent
        tableData={tableData}
        payloadGet={payloadGet}
        setPayloadGet={setPayloadGet}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        tableName="top_page_table"
      />
    </>
  );
};

export default TopPageContainer;
