import BottomMenu from "../../components/shared/BottomMenu/BottomMenu";
import Navbar from "../../components/shared/Navbar/Navbar";
import Wrapper from "../../components/shared/Wrapper/Wrapper";
import css from "./MainLayout.module.css";
import { Outlet, useMatch, useMatches } from "react-router";
export default function MainLayout() {

  const matches = useMatches();
  return (
    <div className={css.mainlayout}>
      <Navbar />
      <div>{matches[matches.length-1]?.handle?.path}</div>
      <div className={css.content}>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
      <BottomMenu />
    </div>
  );
}
