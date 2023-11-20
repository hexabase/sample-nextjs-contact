import { useEffect } from "react";
import CustomTable from "@/components/tables";
import { Spin } from "antd";

interface Props {
  tableData: any,
  payloadGet: any,
  setPayloadGet: any,
  pagination: any,
  setPagination: any,
  columns: any,
  isLoading: boolean,
  tableName: string,
}

const TableComponent = (props: Props) => {
  const {
    tableData,
    payloadGet,
    setPayloadGet,
    pagination,
    setPagination,
    columns,
    isLoading,
    tableName,
  } = props;
  useEffect(() => {
    const tempPagination = { ...pagination };
    tempPagination.total = tableData?.totalItems;
    setPagination(tempPagination);
  }, [tableData]);

  const setPage = (page: number) => {
    const tempPagination = { ...pagination };
    tempPagination.page = page;
    setPayloadGet({
      ...payloadGet,
      page: page
    });
    setPagination(tempPagination);
  };

  const setLimit = (limit: number) => {
    const tempPagination = { ...pagination };
    tempPagination.limit = limit;
    setPagination(tempPagination);
  };
  return (
    <Spin spinning={isLoading}>
      <CustomTable
        columns={columns}
        data={tableData?.items}
        pagination={pagination}
        setPage={setPage}
        setLimit={setLimit}
        tableName={tableName}
        rowKey="key"
        showQuickJumper={true}
      />
    </Spin>
  );
};

export default TableComponent;
