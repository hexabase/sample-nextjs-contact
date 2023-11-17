import PrivateLayout from '@/components/layouts/PrivateLayout';
import withAuthenticationServer from '@/hooks/withAuthentication';
import type { NextPageWithLayout } from '@/pages/_app';
import type { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import InquiryContainer from '@/containers/Inquiry';

const InquiryPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return <InquiryContainer />;
};

InquiryPage.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export const getServerSideProps: GetServerSideProps = withAuthenticationServer(
  async () => ({
    props: {},
  })
);

export default InquiryPage;
