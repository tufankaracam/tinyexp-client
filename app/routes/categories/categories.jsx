import { useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./categories.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatches } from "react-router";
import Modal from "../../components/ui/Modal/Modal";
import Card from "../../components/ui/Card/Card";
import Form from "../../components/ui/Form/Form";
import TextInput from "../../components/ui/TextInput/TextInput";

export const handle = {
  title: "Categories",
  breadcrumb: ["categories"],
};

export default function CategoriesPage() {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;

  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState([
    {
      id: 1,
      name: "Spor",
      type: "category",
      level: 3,
      xp: 500,
      logs: 21,
      nextxp: 1500,
      subcount: 4,
      activitycount: 7,
    },
    {
      id: 2,
      name: "Beslenme",
    },
    {
      id: 3,
      name: "Kisisel Gelisim",
    },
  ]);

  const openButton = () => {
    alert("open aciliyor");
  };

  return (
    <div>
      <Navbar title="Categories" openButton={handleModalToggle} />
      <Wrapper>
        <Breadcrumb data={breadcrumb} />
        {data.map((c) => (
          <CategoryCard
            name={c.name}
            type={c.type}
            level={c.level}
            xp={c.xp}
            nextxp={c.nextxp}
            logs={c.logs}
            subcount={c.subcount}
            activitycount={c.activitycount}
          />
        ))}
        <EmptyCard />
        <Modal isOpen={isOpen} close={handleModalToggle}>
          <Form close={handleModalToggle}>
            <TextInput />
            <TextInput />
            <TextInput />
            <TextInput />
          </Form>
        </Modal>
      </Wrapper>
    </div>
  );
}
