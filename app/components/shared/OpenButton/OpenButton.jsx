import { FaArrowRight } from "react-icons/fa";
import Button from "../../ui/Button/Button";
import css from "./OpenButton.module.css";

export default function OpenButton({text="Open",...rest}) {
  return (
    <Button type="button" className={css.button} {...rest}>
        {text}
      <FaArrowRight size={24}/>
    </Button>
  );
}
