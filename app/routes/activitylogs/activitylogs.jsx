import { useMatches } from "react-router";
import ActivityLogCard from "../../components/features/activitylogs/ActivityLogCard/ActivityLogCard";
import CategoryCard from "../../components/features/categories/CategoryCard/CategoryCard";
import Breadcrumb from "../../components/shared/Breadcrumb/Breadcrumb";
import EmptyCard from "../../components/shared/EmptyCard/EmptyCard";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./activitylogs.module.css";

export const handle = {
  title: "Activity Logs",
  breadcrumb: ["categories", "subcategories", "activities", "logs"],
};

export default function ActivityLogsPage() {
  const matches = useMatches();
  const breadcrumb = matches[matches.length - 1]?.handle?.breadcrumb;
  return (
    <div>
      <Navbar title="Activity Logs" />
      <Wrapper>
        <Breadcrumb data={breadcrumb} />
        <ActivityLogCard />
        <ActivityLogCard />
        <ActivityLogCard />
        <ActivityLogCard />
        <ActivityLogCard />
        <EmptyCard />
      </Wrapper>
    </div>
  );
}
