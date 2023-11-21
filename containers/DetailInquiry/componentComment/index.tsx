import IconSend from "@/components/icons/IconSend";
import { Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { listInquiriesPayloadDataType } from "@/common/param-types";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PARAM_SEARCH } from "@/common/constants/params";
import { commentServiceApi } from "@/services/comment-service";
import { formatTime } from "@/utils";
import { NON_SECOND_DATETIME_FORMAT } from "@/common/constants/dateFormat";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@/common/constants/cookie";

interface Props {
  inquiryId?: any;
  pic?: any;
}

function CommentComponent(props: Props) {
  const { inquiryId, pic } = props;
  const { getListComments, createComment } = commentServiceApi;
  const [valueInput, setValueInput] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>();
  const [
    payloadGet, setPayloadGet
  ] = useState<listInquiriesPayloadDataType>({
    page: DEFAULT_PARAM_SEARCH.page,
    per_page: 9999,
    use_display_id: true,
    return_number_value: true,
    conditions: [
      {
        "conditions": [
          { "id": "inquiry_id", "search_value": [`${inquiryId}`] }
        ]
      }
    ]
  });

  useQuery({
    queryKey: ["comments", { payloadGet, isFetching }],
    queryFn: () => getListComments(payloadGet),
    onSuccess: (data) => setTableData(data)
  });

  useEffect(() => {
    setIsLoading(true);
    setIsFetching(false);
    getListComments(payloadGet).then(r => {
      setTableData(r);
      setIsLoading(false);
    });
  }, [payloadGet, isFetching]);
  const handleSendComment = () => {
    if (valueInput) {
      const payload = {
        item: {
          inquiry_id: inquiryId,
          user_id: Cookies.get(COOKIES_KEY.USER_ID),
          content: valueInput
        },
        ensure_transaction: true
      };
      createComment(payload).then(r => setIsFetching(true));
    }
  };
  return (
    <div className="mx-2 mt-5 mb-8 rounded bg-[#fff] shadow-[0_0_15px_5px_#00000025] p-5">
      <div className="text-base border-b-2 border-b-[#E6E6E6] py-1">
        コメント
      </div>
      <Spin spinning={isLoading}>
        {tableData?.items && (
          <div>
            {tableData?.items.map((item: any) => (
              <div className="my-3">
                <div className="flex items-center gap-5 mb-2">
                  <span className="text-lg font-bold">{pic}</span>
                  <span className="text-sm">{formatTime(item?.created_at, NON_SECOND_DATETIME_FORMAT)}</span>
                </div>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </Spin>
      <div className="px-20 mt-3">
        <div className="flex gap-2 items-center">
          <Input
            value={valueInput}
            onChange={(e: any) => setValueInput(e.target.value)}
            size="large"
            placeholder="message"
            className="!rounded"
          />
          <div
            className="cursor-pointer text-[#808080] hover:scale-125"
            onClick={handleSendComment}
          >
            <IconSend width={28} height={28} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentComponent;
