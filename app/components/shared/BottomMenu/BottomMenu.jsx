import { Navigate, useNavigate } from "react-router";
import { AiFillDashboard } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import css from "./BottomMenu.module.css";
export default function BottomMenu() {
  const navigate = useNavigate();

  return (
    <div className={css.bottommenu}>
      <button
        className={css.bottommenuuitem}
        onClick={() => {
          navigate("/");
        }}
      >
        <AiFillDashboard />
        Dashboard
      </button>
      <button
        className={css.bottommenuuitem}
        onClick={() => {
          navigate("/categories");
        }}
      >
        <MdCategory />
        Categories
      </button>
      <button
        className={css.bottommenuuitem}
        onClick={() => {
          navigate("/profile");
        }}
      >
        <CgProfile />
        Profile
      </button>
    </div>
  );
}
