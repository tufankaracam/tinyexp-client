import { redirect } from "react-router";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import DateInput from "../../components/ui/DateInput/DateInput";
import EmailInput from "../../components/ui/EmailInput/EmailInput";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import TextInput from "../../components/ui/TextInput/TextInput";
import { restrictedRouteMiddleware } from "../../middleware/restrictedRoute.server";
import { getSession } from "../../session.server/userSession";
import css from "./register.module.css";

export const middleware = [restrictedRouteMiddleware];

export async function action({ request, context }) {
  const { register } = await import("../../services/api.server");
  const { setUserDataBySession } = await import(
    "../../services/userSessionManager.server"
  );
  const session = await getSession(request.headers.get("cookie"));
  const sessionId = session.get("sessionId");
  const sessionContext = await import("../../session.server/userSession");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await register({
    email: data.email,
    username: data.username,
    password: data.password,
    password2: data.password2,
  });
  console.log(result);
  if (result?.success) {
    setUserDataBySession(sessionId, { loggedIn: true, ...result?.data });
    return redirect("/");
  }
  return { result };
}

export default function RegisterPage({ actionData }) {
  return (
    <div className="container">
      <FormContainer
        title="Register"
        action="/register"
        method="post"
        error={actionData?.result?.message}
      >
        <EmailInput name="email" label="email" placeholder="user@example.com" />
        <TextInput name="username" label="username" placeholder="john" />
        <PasswordInput
          name="password"
          label="password"
          placeholder="strong password"
        />
        <PasswordInput
          name="password2"
          label="password confirm"
          placeholder="repeat password"
        />
      </FormContainer>
      <ul className="formlinkitems">
        <li className="formlinkitem">
          <a className="formlink" href="/register">
            New Account
          </a>
        </li>
        <li className="formlinkitem">
          <a className="formlink" href="/forgotpassword">
            Forgot Password?
          </a>
        </li>
      </ul>
    </div>
  );
}
