import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'regenerator-runtime/runtime';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import '@/styles/app.scss';
import { ConfigProvider } from 'antd';
import jaJp from 'antd/locale/ja_JP';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout | any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ConfigProvider locale={jaJp}>
        {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
