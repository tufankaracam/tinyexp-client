import { redirect, useActionData, useLoaderData } from "react-router";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import DateInput from "../../components/ui/DateInput/DateInput";
import EmailInput from "../../components/ui/EmailInput/EmailInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import TextInput from "../../components/ui/TextInput/TextInput";
import css from "./login.module.css";
import { restrictedRouteMiddleware } from "../../middleware/restrictedRoute.server";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import { ToastContainer, toast } from "react-toastify";
import { getSession } from "../../session.server/userSession";
import { useEffect } from "react";

export const middleware = [restrictedRouteMiddleware];

export async function action({ request, context }) {
  const { login } = await import("../../services/api.server");
  const { setUserDataBySession } = await import(
    "../../services/userSessionManager.server"
  );
  const session = await getSession(request.headers.get("cookie"));
  const sessionId = session.get("sessionId");
  const sessionContext = await import("../../session.server/userSession");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await login({ email: data.email, password: data.password });
  if (result?.success) {
    setUserDataBySession(sessionId, { loggedIn: true, ...result?.data });
    return redirect("/");
  }
  return { result };
}

export default function LoginPage({ actionData }) {
  return (
    <div className="container">
      <FormContainer
        title="Login"
        action="/login"
        method="post"
        error={actionData?.result?.message}
      >
        <EmailInput name="email" label="email" error={actionData?.result?.errors?.email} placeholder="user@example.com" />
        <PasswordInput
          name="password"
          label="password"
          error={actionData?.result?.errors?.password}
          placeholder="password"
        />
      </FormContainer>
      <ul className="formlinkitems">
        <li className="formlinkitem">
          <a className="formlink" href="/register">
            Create Account
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
