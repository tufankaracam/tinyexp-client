import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import Button from "../../components/ui/Button/Button";
import css from "./profile.module.css";
import InputGroup from "../../components/ui/InputGroup/InputGroup";
import Card from "../../components/ui/Card/Card";
import Line from "../../components/ui/Line/Line";
import ProgressBar from "../../components/ui/ProgressBar/ProgressBar";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import WelcomeCard from "../../components/features/dashboard/WelcomeCard/WelcomeCard";
import SaveButton from "../../components/shared/SaveButton/SaveButton";
import InfoGroup from "../../components/ui/InfoGroup/InfoGroup";
import CancelButton from "../../components/shared/CancelButton/CancelButton";
import FormContainer from "../../components/ui/FormContainer/FormContainer";
import TextInput from "../../components/ui/TextInput/TextInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import DateInput from "../../components/ui/DateInput/DateInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import { protectedRouteMiddleware } from "../../middleware/protectedRoute.server";

import TitleText from "../../components/ui/TitleText/TitleText";
import InfoText from "../../components/ui/InfoText/InfoText";
import InfoTextFree from "../../components/ui/InfoTextFree/InfoTextFree";
import LogoutButton from "../../components/shared/LogoutButton/LogoutButton";
import ChangePasswordButton from "../../components/shared/ChangePasswordButton/ChangePasswordButton";
import { useMatches, useSubmit } from "react-router";
import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import BottomMenu from "../../components/shared/BottomMenu/BottomMenu";
import { changePassword } from "../../services/api.server";

export const handle = {
  title: "Profile Page",
  breadcrumb: ["profile"],
};

export const middleware = [protectedRouteMiddleware];

export async function loader({ request, context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);
  return { userData };
}

export async function action({ request, context }) {
  const { sessionContext } = await import("../../middleware/session.server");
  const { deleteUserDataBySession } = await import(
    "../../services/userSessionManager.server"
  );
  const userData = context.get(sessionContext);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  switch (data?.action) {
    case "logout":
      deleteUserDataBySession(userData?.sessionId);
      break;
    case "changepassword":
      const result = await changePassword({
        token: userData?.userData?.token,
        oldpassword: data?.oldpassword,
        password: data?.password,
        password2: data?.password2,
      });
      return { result };
  }
}

export default function ProfilePage({ loaderData, actionData }) {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  const [isOpen, setIsOpen] = useState(actionData?.result?.success != true);
  const [actionError, setActionError] = useState(null);
  const [formError, setFormError] = useState(null);
  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.result?.success) {
      setIsOpen(false);
    } else {
      setActionError(actionData?.result?.message);
      setFormError(actionData?.result?.errors);
    }
  }, [actionData]);

  const closeModal = () => {
    setIsOpen(false);
    setIsOpen(false);
    setActionError(null);
    setFormError(null);
  };

  const openModal = (data) => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    submit({ action: "logout" }, { method: "post" });
  };

  return (
    <div className="page">
      <Navbar title="Profile" />
      <div className="container">
        <Card>
          <TitleText value={"Profile Details"} />
          <InfoTextFree
            label={"Username"}
            value={loaderData?.userData?.userData?.username}
            flexDirection={"row"}
            gap="9px"
          />
          <InfoTextFree
            label={"Email"}
            value={loaderData?.userData?.userData?.email}
            flexDirection={"row"}
            gap="9px"
          />
          <Line />
          <InputGroup>
            <ChangePasswordButton onClick={openModal} />
            <LogoutButton onClick={handleLogout} />
          </InputGroup>
        </Card>
        <Modal isOpen={isOpen} close={closeModal}>
          <FormContainer
            title="Change Password"
            method="post"
            error={actionData?.result?.message}
            close={closeModal}
          >
            <input type="hidden" name="action" value="changepassword" />
            <PasswordInput
              name="oldpassword"
              error={actionData?.result?.errors?.oldpassword}
              label="current password"
              placeholder="Current Password"
              autocomplete="off"
            />
            <PasswordInput
              name="password"
              error={actionData?.result?.errors?.password}
              label="new password"
              placeholder="New Password"
              autocomplete="off"
            />
            <PasswordInput
              name="password2"
              error={actionData?.result?.errors?.password2}
              label="confirm new password"
              placeholder="New Password"
              autocomplete="off"
            />
          </FormContainer>
        </Modal>
      </div>
      <BottomMenu />
    </div>
  );
}
