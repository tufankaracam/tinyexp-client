import CancelButton from "../../shared/CancelButton/CancelButton";
import SaveButton from "../../shared/SaveButton/SaveButton";
import css from "./Form.module.css";
import { IoCloseOutline } from "react-icons/io5";

export default function Form({ title="Form Title",close,children }) {
  return (
    <form className={css.form}>
      <div className={css.header}>
        <span className={css.title}>{title}</span>
        <button type="button" className={css.closebutton} onClick={close}>
          <IoCloseOutline />
        </button>
      </div>
      <div className={css.content}>
        {children}
      </div>
      <div className={css.footer}>
        <CancelButton />
        <SaveButton />
      </div>
    </form>
  );
}
