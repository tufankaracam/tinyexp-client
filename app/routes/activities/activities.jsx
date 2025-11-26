import { useState } from "react";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./activities.module.css";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import { useMatch, useMatches } from "react-router";

export const handle = {
  title: "Activities",
  breadcrumb: ["categories","subcategories","activities"]
};

export default function ActivitiesPage() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Kitap Okuma",
      type: "activity",
      level: 3,
      xp: 500,
      logs: 21,
      nextxp: 1500,
      trackingtype: "Sayfa",
      value: 500,
    },
    {
      id: 2,
      name: "Gunluk Kosu",
      type: "activity",
      level: 5,
      xp: 750,
      logs: 21,
      nextxp: 1000,
      trackingtype: "Sayfa",
      value: 500,
    },
    {
      id: 3,
      name: "Full Body Antrenman",
      type: "activity",
      level: 7,
      xp: 9500,
      logs: 15,
      nextxp: 12500,
      trackingtype: "Set",
      value: 750,
    },
  ]);
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  return (
    <div>
      <Navbar title="Activities" />
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
            trackingtype={c.trackingtype}
            value={c.value}
          />
        ))}
        <EmptyCard/>
      </Wrapper>
    </div>
  );
}
