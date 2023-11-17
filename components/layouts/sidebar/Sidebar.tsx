import { COOKIES_KEY } from '@/common/constants/cookie';
import { APP_ROUTES } from '@/common/constants/routes';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import cx from 'classnames';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import Logo from '@/public/images/logo_sidebar.png';
import Image from 'next/image';

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

interface ISidebar {
  collapsed: boolean;
  menu: any;
}

const Sidebar: React.FC<ISidebar> = ({ collapsed, menu }) => {
  const { Sider } = Layout;
  const router = useRouter();

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [current, setCurrent] = useState('/');

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  useEffect(() => {
    const url = router.pathname;
    if (url.includes('/inquiry')) {
      setCurrent('/inquiry');
    } else {
      setCurrent('/');
    }
  }, [router.pathname]);

  const handleLogout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <Sider className={cx(styles.side_bar)} collapsed={collapsed} width={256}>
      <div className="text-center mb-7 flex items-center mr-5">
        <Image
          src={Logo}
          className={cx(styles.login_logo, 'mx-auto')}
          alt="logo"
        />
      </div>
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onClick={onClick}
        selectedKeys={[current]}
        onOpenChange={onOpenChange}
        style={{ width: '100%' }}
        items={menu}
      />
    </Sider>
  );
};

export default Sidebar;
