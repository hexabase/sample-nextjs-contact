import React from 'react';
import Image from 'next/image';
import avatarDefault from '@/public/images/avatarDefault.png';
import {
  NON_SECOND_DATETIME_FORMAT,
  SPLASH_REVERSED_DATE_FORMAT,
} from '@/common/constants/dateFormat';
import { DETAIL_INQUIRY_NAME_SPACES } from '@/common/constants/namespaces';
import { formatTime } from '@/common/libs/functions';

interface Props {
  data?: any;
  systemDueDate?: any;
}

const BasicInquiryInformation = (props: Props) => {
  const { data, systemDueDate } = props;
  return (
    <>
      <div className="mt-5 flex gap-4">
        <Image src={avatarDefault} alt="avatar" width={56} height={56} />
        <div className="flex flex-col">
          <span className="font-bold text-lg">{data?.created_by}</span>
          <div className="flex gap-4">
            {data?.created_at && (
              <span className="text-base">
                {DETAIL_INQUIRY_NAME_SPACES.CREATED_DATE_LABEL}{' '}
                {formatTime(data?.created_at, NON_SECOND_DATETIME_FORMAT)}
              </span>
            )}
            {systemDueDate && (
              <span className="text-base font-bold text-red-500">
                {DETAIL_INQUIRY_NAME_SPACES.DEADLINE_DATE_LABEL}{' '}
                {formatTime(systemDueDate, SPLASH_REVERSED_DATE_FORMAT)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4" dangerouslySetInnerHTML={{ __html: data?.content.replace(/\n/g, '<br>') }} />
    </>
  );
};

export default BasicInquiryInformation;
