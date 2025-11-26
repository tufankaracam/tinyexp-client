import { IoIosAdd } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./SaveButton.module.css";

export default function SaveButton({className,...rest}) {
  return (
    <Button type="submit" className={`${css.button} ${className}`} {...rest}>
        Save
    </Button>
  );
}
