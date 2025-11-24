import { MdOutlineModeEdit } from "react-icons/md";
import Button from "../../ui/Button/Button";
import css from "./EditButton.module.css";

export default function EditButton({ ...rest }) {
  return (
    <Button className={css.button} {...rest}>
      <MdOutlineModeEdit size={24} />
      Edit
    </Button>
  );
}
