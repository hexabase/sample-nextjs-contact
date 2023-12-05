import React, { useState } from "react";
import { loginSchema } from "@/common/form-schemas";
import ButtonComponent from "../../../components/buttons";
import FormItem from "@/components/form-items/FormItem";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { TextInput } from "@/components/inputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { COOKIES_KEY } from "@/common/constants/cookie";
import { LOGIN_NAME_SPACES } from "@/common/constants/namespaces";
import { Spin } from "antd";
import { useHexabase, useHexabaseStore } from "@/hooks/useHexabase";

const FormLogin: React.FC = () => {
  const { setClientHxb } = useHexabaseStore();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const client = await useHexabase(values?.email, values?.password);
      if (client) {
        setClientHxb(client);
        Cookies.set(COOKIES_KEY.ACCESS_TOKEN, client.tokenHxb);
        Cookies.set(COOKIES_KEY.ACCESS_TOKEN, client.tokenHxb);
        Cookies.set(COOKIES_KEY.USERNAME, client?.currentUser?.userName ?? "");
        Cookies.set(COOKIES_KEY.EMAIL, client?.currentUser?.email ?? "");
        Cookies.set(COOKIES_KEY.USER_ID, client?.currentUser?.id ?? "");
        Cookies.set(COOKIES_KEY.PROFILE_PICTURE, client?.currentUser?.profilePicture ?? "");
        await router.push(APP_ROUTES.HOME);
      }
    } catch (_) {
      toast.error("Wrong email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6"
        >
          <FormItem name="email" containerClassName="mb-6">
            <TextInput placeholder={LOGIN_NAME_SPACES.EMAIL_PLACEHOLDER} />
          </FormItem>
          <FormItem name="password" containerClassName="mb-6">
            <PasswordInput placeholder={LOGIN_NAME_SPACES.PASSWORD_PLACEHOLDER} />
          </FormItem>
          <Spin spinning={isLoading}>
            <div className="text-center">
              <ButtonComponent
                variant="out-line"
                text={LOGIN_NAME_SPACES.SUBMIT_BTN}
              />
            </div>
          </Spin>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormLogin;
