import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { animated, useSpring } from "@react-spring/web";
import spring from "@/utils/spring";
import { useRouter } from "next/router";
import IconHome from "../icons/IconHome";
import IconHeadPhone from "../icons/IconHeadPhone";
import Topbar from "@/components/layouts/topbar/Topbar";

const cx = classNames.bind(styles);

const PrivateLayout: React.FC<{ children: any; className?: string }> = (
  {
    children,
    className
  }
) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [springStyles, api] = useSpring(() => spring.FADED);

  const router = useRouter();
  // const menuLeft: any[] = [];
  const menuLeft = [
    {
      label: "トップ",
      key: "/",
      route: "/",
      icon: (
        <div className="text-white">
          <IconHome />
        </div>
      )
    },
    {
      label: "お問い合わせ",
      key: "/inquiry",
      route: "/inquiry",
      icon: (
        <div className="text-white">
          <IconHeadPhone />
        </div>
      )
    }
  ]
  // if (user?.is_ws_admin) {
  //   menuLeft.push(
  //     {
  //       label: "トップ",
  //       key: "/",
  //       route: "/",
  //       icon: (
  //         <div className="text-white">
  //           <IconHome />
  //         </div>
  //       )
  //     }
  //   );
  // }
  // menuLeft.push(
  //   {
  //     label: "お問い合わせ",
  //     key: "/inquiry",
  //     route: "/inquiry",
  //     icon: (
  //       <div className="text-white">
  //         <IconHeadPhone />
  //       </div>
  //     )
  //   }
  // );

  useEffect(() => {
    api.start(spring.FADED);
    return () => {
      api.stop();
    };
  }, [api, router.pathname]);

  return (
    <div className={cx("flex", "private_layout", [className])}>
      <Sidebar menu={menuLeft} collapsed={collapsed} />
      <div className="flex-1">
        <div className={cx("private_layout_content")}>
          <Topbar />
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
