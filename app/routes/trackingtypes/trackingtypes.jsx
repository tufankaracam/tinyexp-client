import { useMatches } from "react-router";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./trackingtypes.module.css";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";

export const handle = {
  title: "Tracking Types",
  breadcrumb: ["trackingtypes"],
};

export default function TrackingTypesPage() {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  return (
    <div>
      <Navbar title="Tracking Types" />
      <Wrapper>
        <Breadcrumb data={breadcrumb} />
        <CategoryCard />
        <EmptyCard />
      </Wrapper>
    </div>
  );
}
