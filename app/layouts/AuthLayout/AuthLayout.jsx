import css from "./AuthLayout.module.css";
import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <div className={css.mainlayout}>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}
