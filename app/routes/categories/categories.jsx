import { useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./categories.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";

export const handle = {
  title: "Categories Page",
};

export default function CategoriesPage() {
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
    }
  ]);

  const openButton = ()=>{
    alert("open aciliyor")
  }

  return (
    <div>
      <Navbar title="Categories" openButton={openButton} />
      <Wrapper>
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
        <EmptyCard/>
      </Wrapper>
    </div>
  );
}
