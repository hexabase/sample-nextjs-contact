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
    tempPagination.total = tableData?.totalItems;
    setPagination(tempPagination);
  }, [tableData]);

  const handleTableChange = (pagination: any, filters: any, sorter: { columnKey: string; order: string; }) => {
    // Check if the column has been sorted
    console.log(sorter);
    console.log(payloadGet);
    if (sorter && sorter?.columnKey) {
      const sortFields = [];
      if (sorter.order === "descend") {
        sortFields.push({
          id: sorter.columnKey !== "date" ? sorter.columnKey : "updated_at",
          order: "desc"
        });
      } else if (sorter.order === "ascend") {
        sortFields.push({
          id: sorter.columnKey !== "date" ? sorter.columnKey : "updated_at",
          order: "asc"
        });
      }
      setPayloadGet({
        ...payloadGet,
        sort_fields: sortFields
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
