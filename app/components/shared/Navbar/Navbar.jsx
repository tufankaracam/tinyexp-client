import { useLocation, useNavigate } from "react-router";
import AddButton from "../AddButton/AddButton";
import BackButton from "../BackButton/BackButton";
import css from "./Navbar.module.css";
export default function Navbar({ title = "Title", openButton }) {
  const location = useLocation();
  const navigate = useNavigate();
  const paths = ["/", "/categories", "/latest"];
  return (
    <div className={css.navbar}>
      <div className={`${css.holder} ${css.left}`}>
        {!paths.includes(location?.pathname) ? (
          <BackButton
            onClick={() => {
              navigate(-1);
            }}
          />
        ) : (
          <span></span>
        )}
      </div>

      <div className={css.title}>{title}</div>
      <div className={`${css.holder} ${css.right}`}>
        {openButton ? (
          <AddButton
            onClick={() => {
              openButton();
            }}
          />
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
