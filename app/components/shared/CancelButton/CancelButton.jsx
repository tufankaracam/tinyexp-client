import { IoIosAdd } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./CancelButton.module.css";

export default function CancelButton({className,...rest}) {
  return (
    <Button type="reset" className={`${css.button} ${className}`} {...rest}>
        Cancel
    </Button>
  );
}
