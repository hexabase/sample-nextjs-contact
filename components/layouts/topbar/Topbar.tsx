import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { Layout } from "antd";
import cx from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import styles from "./topbar.module.scss";
import { useTopBarStore } from "@/hooks/useTopBar";

const Topbar: React.FC = () => {
  const { title } = useTopBarStore();
  const { Sider } = Layout;
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <Sider className={cx(styles.top_bar)} width={"100%"}>
      <div className="flex items-center justify-between font-semibold h-full mb-6">
        <span>{title}</span>
      </div>
    </Sider>
  );
};

export default Topbar;
