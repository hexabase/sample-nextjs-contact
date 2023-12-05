import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { Layout } from "antd";
import cx from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import styles from "./topbar.module.scss";
import { useTopBarStore } from "@/hooks/useTopBar";

const TopBar: React.FC = () => {
  const { title } = useTopBarStore();
  const { Sider } = Layout;

  return (
    <Sider className={cx(styles.top_bar)} width={"100%"}>
      <div className="flex items-center justify-between font-semibold h-full mb-6">
        <span>{title}</span>
      </div>
    </Sider>
  );
};

export default TopBar;
