'use client';

import { useTranslation } from '@/common/libs/i18n/client';
import PrivateLayout from '@/components/layouts/PrivateLayout';
import InquiryContainer from '@/containers/inquiries';

export default function HomePage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, 'common');
  return (
    <PrivateLayout>
      <InquiryContainer />
    </PrivateLayout>
  );
}
