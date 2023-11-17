import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const withAuthenticationServer =
  (getServerSideProps: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
    if (!context?.req?.cookies?.[COOKIES_KEY.ACCESS_TOKEN]) {
      return {
        redirect: {
          permanent: false,
          destination: APP_ROUTES.LOGIN,
        },
      };
    }

    return getServerSideProps({ ...context });
  };
export default withAuthenticationServer;
