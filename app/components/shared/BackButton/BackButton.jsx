import { IoMdArrowBack } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./BackButton.module.css";

export default function BackButton({...rest}) {
  return (
    <Button className={css.button} {...rest}>
      <IoMdArrowBack size={24} />
    </Button>
  );
}
