import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";

import { authCredentials } from "../../providers"

export const Login = () => {
  return (
    <AuthPage
      type="login"
      registerLink={false}
      forgotPasswordLink={false}
      title={<ThemedTitleV2 collapsed={false} text="Refine Project" />}
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};