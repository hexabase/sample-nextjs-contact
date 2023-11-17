import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const withNoAuthenticationServer =
  (getServerSideProps: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
    if (context?.req?.cookies?.[COOKIES_KEY.ACCESS_TOKEN]) {
      return {
        redirect: {
          permanent: false,
          destination: APP_ROUTES.HOME,
        },
      };
    }
    return getServerSideProps({ ...context });
  };
export default withNoAuthenticationServer;
