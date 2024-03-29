'use client';

import TopPageContainer from '@/containers/top_pages';
import { useTranslation } from '@/common/libs/i18n/client';
import PrivateLayout from '@/components/layouts/PrivateLayout';

export default function HomePage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, 'common');
  return (
    <PrivateLayout>
      <TopPageContainer />
    </PrivateLayout>
  );
}
