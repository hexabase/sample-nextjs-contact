import IconSend from "@/components/icons/IconSend";
import { Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { DEFAULT_PARAM_SEARCH } from "@/common/constants/params";
import { commentServiceApi } from "@/services/comment-service";
import { NON_SECOND_DATETIME_FORMAT } from "@/common/constants/dateFormat";
import { DETAIL_INQUIRY_NAME_SPACES } from "@/common/constants/namespaces";
import { GetItemsParameters } from "@hexabase/hexabase-js/src/lib/types/item/input";
import { formatTime } from "@/common/libs/functions";
import { inquiryServiceApi } from "@/services/inquiry-service";

interface Props {
  inquiryId?: any;
}

function CommentComponent(props: Props) {
  const {
    inquiryId,
  } = props;
  const {
    // getListComments,
    createComment,
  } = commentServiceApi;
  const { getInquiryHistories } = inquiryServiceApi;
  const [valueInput, setValueInput] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>();
  const [payloadGet, setPayloadGet] = useState<GetItemsParameters>({
    page: DEFAULT_PARAM_SEARCH.PAGE,
    per_page: 9999,
    use_display_id: true,
    return_number_value: true,
    conditions: [{ id: "inquiry_id", search_value: [`${inquiryId}`] }]
  });

  useEffect(() => {
    setIsLoading(true);
    setIsFetching(false);
    getInquiryHistories(inquiryId, {
      exclude_action_history: true
    }).then((r) => {
      setTableData(r?.histories);
      setIsLoading(false);
    });
  }, [payloadGet, isFetching]);


  // useEffect(() => {
  //   setIsLoading(true);
  //   setIsFetching(false);
  //   getListComments(payloadGet).then((r) => {
  //     setTableData(r);
  //     setIsLoading(false);
  //   });
  // }, [payloadGet, isFetching]);
  const handleSendComment = () => {
    if (valueInput) {
      setIsLoading(true);
      setIsFetching(false);
      const payload = {
        item_id: inquiryId,
        comment: valueInput
      };
      createComment(payload).then((_) => {
        setValueInput("");
        setIsFetching(true);
      });
    }
  };
  return (
    <div className="mx-2 mt-5 mb-8 rounded bg-[#fff] shadow-[0_0_15px_5px_#00000025] p-5">
      <div className="text-base border-b-2 border-b-[#E6E6E6] py-1">
        {DETAIL_INQUIRY_NAME_SPACES.COMMENT_BOX_TITLE}
      </div>
      <Spin spinning={isLoading}>
        {tableData && (
          <div className="comment_box max-h-[30vh] overflow-y-scroll">
            {tableData.map((item: any, i: number) => (
                <>
                  {item?.comment && (
                    <div className="my-3" key={i}>
                      <div className="flex items-center gap-5 mb-2">
                        {item?.username && <span className="text-lg font-bold">{item?.username}</span>}
                        <span className="text-sm">
                    {formatTime(item?.created_at, NON_SECOND_DATETIME_FORMAT)}
                  </span>
                      </div>
                      <p>{item?.comment}</p>
                    </div>
                  )}
                </>
              )
            )}
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
