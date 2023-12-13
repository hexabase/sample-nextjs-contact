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
  onRow?: any,
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
    onRow
  } = props;
  useEffect(() => {
    const tempPagination = { ...pagination };
    tempPagination.total = tableData?.totalCount;
    setPagination(tempPagination);
  }, [tableData]);

  const handleTableChange = (pagination: any, filters: any, sorter: { columnKey: string; order: string; }) => {
    let newPayloadGet = payloadGet;
    if (pagination && pagination?.current) {
      newPayloadGet =  {
        ...newPayloadGet,
        page: pagination?.current
      }
    }
    // Check if the column has been sorted
    if (sorter && sorter?.columnKey) {
      const sortFieldId = sorter.columnKey !== "date" ? sorter.columnKey : "updated_at";
      let sortFieldOrder = "";
      if (sorter.order === "descend") {
        sortFieldOrder = "desc"
      } else if (sorter.order === "ascend") {
        sortFieldOrder = "asc"
      }
      newPayloadGet =  {
        ...newPayloadGet,
        sort_field_id: sortFieldId,
        sort_order: sortFieldOrder,
      }
    }
    setPayloadGet(newPayloadGet);
  };

  const setPage = (page: number) => {
    const tempPagination = { ...pagination };
    tempPagination.page = page;
    // setPayloadGet({
    //   ...payloadGet,
    //   page: page
    // });
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
        onRow={onRow}
        rowKey="key"
      />
    </Spin>
  );
};

export default TableComponent;
