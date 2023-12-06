'use client';

import { useTranslation } from '@/common/libs/i18n/client';
import PrivateLayout from '@/components/layouts/PrivateLayout';
import CreateInquiryContainer from '@/containers/inquiries/CreateInquiry';

export default function CreateInquiryPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, 'common');
  return (
    <PrivateLayout>
      <CreateInquiryContainer />
    </PrivateLayout>
  );
}
