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
import Form from "../../components/ui/Form/Form";
import TextInput from "../../components/ui/TextInput/TextInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import DateInput from "../../components/ui/DateInput/DateInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";

export const handle = {
  title: "Dashboard Page",
  path: "> dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <Navbar title="Dashboard"/>
      <Wrapper>
        <Form>
          <TextInput />
          <DateInput/>
          <SelectInput />
          <TextAreaInput/>
          <NumberInput />
          <PasswordInput />
        </Form>
        <WelcomeCard/>
        <CategoryCard/>
      </Wrapper>
    </div>
  );
}
