import React from "react";
import Image from "next/image";
import avatarDefault from "@/public/images/avatarDefault.png";
import { formatTime } from "@/utils";
import { NON_SECOND_DATETIME_FORMAT, SPLASH_REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";


interface Props {
  data?: any,
  systemDueDate?: any,
  content?: any,
}

const BasicInquiryInformation = (props: Props) => {
  const {
    data,
    systemDueDate,
    content
  } = props;

  return (
    <>
      <div className="mt-5 flex gap-4">
        <Image src={avatarDefault} alt="avatar" width={56} height={56} />
        <div className="flex flex-col">
          <span className="font-bold text-lg">{data?.created_by}</span>
          <div className="flex gap-4">
            <span className="text-base">
              投稿日時 {formatTime(data?.created_at, NON_SECOND_DATETIME_FORMAT)}
            </span>
            <span className="text-base font-bold text-red-500">
              期限日 {formatTime(systemDueDate?.value, SPLASH_REVERSED_DATE_FORMAT)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4">
        {content?.value}
      </div>
    </>
  );
};

export default BasicInquiryInformation;
