import css from "./AuthLayout.module.css";
import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <div>
      <h1>Auth Layout</h1>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
}
