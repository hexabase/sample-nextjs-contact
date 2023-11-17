import { PARAM_TOP_BAR_TITLE } from '@/common/constants/params';
import TableInquiry from '@/components/TableInquiry';
import { useTopBarStore } from '@/hooks/useTopBar';
import React, { useEffect } from 'react';

function InquiryContainer() {
  const { setTitle } = useTopBarStore();
  useEffect(() => setTitle(PARAM_TOP_BAR_TITLE.INQUIRY_PAGE), []);
  return (
    <div>
      <TableInquiry />
    </div>
  );
}

export default InquiryContainer;
