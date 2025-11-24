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

export const handle = {
  title: "Dashboard Page",
  path: "> dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <Navbar title="Dashboard"/>
      <Wrapper>
        <CategoryCard/>
      </Wrapper>
    </div>
  );
}
