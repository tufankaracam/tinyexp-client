import { IoIosAdd } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./AddButton.module.css";

export default function AddButton({...rest}) {
  return (
    <Button className={css.button} {...rest}>
        New
      <IoIosAdd size={24} />
    </Button>
  );
}
