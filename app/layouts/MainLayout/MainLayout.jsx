import BottomMenu from "../../components/shared/BottomMenu/BottomMenu";
import Navbar from "../../components/shared/Navbar/Navbar";
import css from "./MainLayout.module.css";
import { Outlet, useMatch, useMatches } from "react-router";
export default function MainLayout() {
  const matches = useMatches();
  return (
    <div className={css.mainlayout}>
      <div className={css.content}>
        <Outlet />
      </div>
      <BottomMenu />
    </div>
  );
}
