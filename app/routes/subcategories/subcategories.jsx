import { useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./subcategories.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatches } from "react-router";

export const handle = {
  title: "Subcategories",
  breadcrumb: ["categories","subcategories"]
};

export default function SubCategoriesPage() {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;

  const [data, setData] = useState([
    {
      id: 1,
      name: "Aerobik",
      type: "subcategory",
      level: 3,
      xp: 500,
      logs: 21,
      nextxp: 1500,
      subcount: 4,
      activitycount: 7,
    },
    {
      id: 2,
      name: "Gunluk Kosu",
      type: "subcategory",
    },
    {
      id: 3,
      name: "Jimnastik",
      type: "subcategory",
    },
  ]);
  return (
    <div>
      <Navbar title="Subcategories" openButton={() => {}} />
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
            activitycount={c.activitycount}
          />
        ))}
        <EmptyCard />
      </Wrapper>
    </div>
  );
}
