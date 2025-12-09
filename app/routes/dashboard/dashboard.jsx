import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import Button from "../../components/ui/Button/Button";
import css from "./dashboard.module.css";
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
import { getCharacter } from "../../services/api.server";

export const handle = {
  title: "Dashboard Page",
  path: "> dashboard",
};

export const middleware = [
  protectedRouteMiddleware,
];


export async function loader({ context }) {

  const { sessionContext } = await import("../../middleware/session.server");
  const userData = context.get(sessionContext);

  const list = await getCharacter(userData?.userData?.token);
  return { userData,list };
}

export default function DashboardPage({loaderData}) {
  return (
    <div>
      <Navbar title="Dashboard"/>
      <Wrapper>
        <WelcomeCard username={loaderData?.userData?.userData?.username}/>
        <CategoryCard
                      key={loaderData?.list?.data[0]?.id}
                      data={loaderData?.list?.data[0]}
                      name={loaderData?.list?.data[0]?.name}
                      parentId={loaderData?.list?.data[0]?.categoryId}
                      type={"category"}
                      level={3}
                      xp={500}
                      nextxp={1500}
                      logs={21}
                      subcount={3}
                      activitycount={21}
                    />
      </Wrapper>
    </div>
  );
}
