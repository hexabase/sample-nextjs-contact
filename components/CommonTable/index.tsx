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
    tableName
  } = props;
  useEffect(() => {
    const tempPagination = { ...pagination };
    tempPagination.total = tableData?.totalCount;
    setPagination(tempPagination);
  }, [tableData]);

  const handleTableChange = (pagination: any, filters: any, sorter: { columnKey: string; order: string; }) => {
    // Check if the column has been sorted
    if (sorter && sorter?.columnKey) {
      let sortFieldId = sorter.columnKey !== "date" ? sorter.columnKey : "updated_at";
      let sortFieldOrder = "";
      if (sorter.order === "descend") {
        sortFieldOrder = "desc"
      } else if (sorter.order === "ascend") {
        sortFieldOrder = "asc"
      }
      setPayloadGet({
        ...payloadGet,
        sort_field_id: sortFieldId,
        sort_order: sortFieldOrder,
      });
    }
  };

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
        showQuickJumper
        columns={columns}
        data={tableData?.items}
        pagination={pagination}
        setPage={setPage}
        setLimit={setLimit}
        tableName={tableName}
        onChange={handleTableChange}
        rowKey="key"
      />
    </Spin>
  );
};

export default TableComponent;
