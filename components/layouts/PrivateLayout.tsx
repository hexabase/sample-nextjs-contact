'use client';

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layouts/sidebars/Sidebar";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { animated, useSpring } from "@react-spring/web";
import IconHome from "@/components/icons/IconHome";
import IconHeadPhone from "@/components/icons/IconHeadPhone";
import TopBar from "@/components/layouts/topbars/TopBar";
import { APP_ROUTES } from "@/common/constants/routes";
import { FADED, MENU_LABEL } from "@/common/constants/params";
import { usePathname } from 'next/navigation'

const cx = classNames.bind(styles);
const PrivateLayout: React.FC<{ children: any; className?: string }> = (
  {
    children,
    className
  }
) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [springStyles, api] = useSpring(() => FADED);
  const pathname = usePathname()
  const menuLeft = [
    {
      label: MENU_LABEL.TOP_PAGE,
      key: APP_ROUTES.HOME,
      route: APP_ROUTES.HOME,
      icon: (
        <div className="text-white">
          <IconHome />
        </div>
      )
    },
    {
      label: MENU_LABEL.INQUIRY_PAGE,
      key: APP_ROUTES.LIST_INQUIRY,
      route: APP_ROUTES.LIST_INQUIRY,
      icon: (
        <div className="text-white">
          <IconHeadPhone />
        </div>
      )
    }
  ]

  useEffect(() => {
    api.start(FADED);
    return () => {
      api.stop();
    };
  }, [api, pathname]);

  return (
    <div className={cx("flex", "private_layout", [className])}>
      <Sidebar menu={menuLeft} collapsed={collapsed} />
      <div className="flex-1">
        <div className={cx("private_layout_content")}>
          <TopBar />
          <div
            className={cx(
              "scroll_private_layout_content",
              "bg-white",
              "min-h-full"
            )}
          >
            <animated.div style={springStyles}>{children}</animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
