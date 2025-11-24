import { MdDelete } from "react-icons/md";

import Button from "../../ui/Button/Button";
import css from "./DeleteButton.module.css";

export default function DeleteButton({ ...rest }) {
  return (
    <Button className={css.button} {...rest}>
      <MdDelete size={24} />
      Delete
    </Button>
  );
}
