'use client';

import { useTranslation } from '@/common/libs/i18n/client';
import PrivateLayout from '@/components/layouts/PrivateLayout';
import DetailInquiry from '@/containers/inquiries/DetailInquiry';

export default function DetailInquiryPage({
  params: { lng, id },
}: {
  params: { lng: string; id: string };
}) {
  const { t } = useTranslation(lng, 'common');
  return (
    <PrivateLayout>
      <DetailInquiry id={id} />
    </PrivateLayout>
  );
}
