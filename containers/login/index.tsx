import { FC } from "react";
import cx from "classnames";
import FormLogin from "./FormLogin";
import Logo from "@/public/images/logo.png";
import styles from "./styles.module.scss";
import Image from "next/image";

const LoginContainer: FC = () => {
  return (
    <div className={cx(styles.login_wrapper, "w-screen h-screen flex items-center justify-center")}>
      <div className={styles.container}>
        <div className="text-center mb-7">
          <Image src={Logo} className={cx(styles.login_logo, "mx-auto")} alt="logo" />
        </div>
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginContainer;
