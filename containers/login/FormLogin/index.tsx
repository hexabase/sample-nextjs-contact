import React from "react";
import { loginSchema } from "@/common/form-schemas";
import ButtonComponent from "../../../components/buttons";
import FormItem from "@/components/form-items/FormItem";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { TextInput } from "@/components/inputs/TextInput";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import { COOKIES_KEY } from "@/common/constants/cookie";
import { LOGIN_NAME_SPACES } from "@/common/constants/namespaces";
import { Spin } from "antd";

const FormLogin: React.FC = () => {
  const {
    loginMutation: { mutate, isLoading }
  } = useAuth();

  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { handleSubmit } = methods;

  const onSuccess = (res: any) => {
    if (res?.token) {
      Cookies.set(COOKIES_KEY.ACCESS_TOKEN, res?.token);
      router.push(APP_ROUTES.HOME).then();
    }
  };

  const onError = (error: any) => {
    toast.error(error?.data?.message || "Wrong email or password");
  };

  const onSubmit = (values: any) => {
    return mutate(values, { onSuccess, onError });
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
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
