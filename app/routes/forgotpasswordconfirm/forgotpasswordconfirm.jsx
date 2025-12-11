import { redirect, useActionData, useLoaderData } from "react-router";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import DateInput from "../../components/ui/DateInput/DateInput";
import EmailInput from "../../components/ui/EmailInput/EmailInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import TextInput from "../../components/ui/TextInput/TextInput";
import css from "./forgotpasswordconfirm.module.css";
import { restrictedRouteMiddleware } from "../../middleware/restrictedRoute.server";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import { getSession } from "../../session.server/userSession";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card/Card";

export const middleware = [restrictedRouteMiddleware];

export async function loader({request,params}){
    const { resetPasswordConfirm, resetPasswordRequest, resetPasswordStatus  } = await import("../../services/api.server");

  const checkResetCode = await resetPasswordStatus({resetcode:params?.resetcode});
  if(!checkResetCode?.success){
    throw redirect('/');
  }

}

export async function action({ request, context,params }) {
  const { resetPasswordConfirm, resetPasswordRequest, resetPasswordStatus  } = await import("../../services/api.server");
  const { setUserDataBySession } = await import(
    "../../services/userSessionManager.server"
  );
  const session = await getSession(request.headers.get("cookie"));
  const sessionId = session.get("sessionId");
  const sessionContext = await import("../../session.server/userSession");

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  console.log(data);
  const result = await resetPasswordConfirm({ resetcode:params?.resetcode,password: data.password,password2: data.password2});
  console.log(result);
  return {result};
}

export default function ForgotPasswordConfirmPage({ actionData }) {
  const [completed,setCompleted] = useState(false);
  useEffect(()=>{
    if(actionData?.result?.success){
      setCompleted(true);
    }
  },[actionData])
  return (
    <div className="container">
      {!completed ? (<><FormContainer
        title="Update Password"
        method="post"
        error={actionData?.result?.message}
      >
        <PasswordInput name="password" label="password" error={actionData?.result?.errors?.password} placeholder="example Secret123!" />
        <PasswordInput name="password2" label="password confirm" error={actionData?.result?.errors?.password2} placeholder="example Secret123!" />
      </FormContainer>
      </>) : (<><Card>{actionData?.result?.message}</Card><ul className="formlinkitems">
        <li className="formlinkitem">
          <a className="formlink" href="/login">
            Already have an account?
          </a>
        </li>
        <li className="formlinkitem">
          <a className="formlink" href="/register">
            Create Account
          </a>
        </li>
      </ul></>)}
      
    </div>
  );
}
