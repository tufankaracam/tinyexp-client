import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./ModalCloseButton.module.css";

export default function ModalCloseButton({className, ...rest }) {
  return (
    <Button className={`${css.button} ${className}`} {...rest}>
      <IoIosCloseCircle size={44} />
    </Button>
  );
}
