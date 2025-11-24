import { FaArrowRight } from "react-icons/fa";
import Button from "../../ui/Button/Button";
import css from "./OpenButton.module.css";

export default function OpenButton({...rest}) {
  return (
    <Button className={css.button} {...rest}>
        Open
      <FaArrowRight size={24}/>
    </Button>
  );
}
