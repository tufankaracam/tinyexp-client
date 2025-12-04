import { TbLockPassword } from "react-icons/tb";
import Button from "../../ui/Button/Button";
import css from "./ChangePasswordButton.module.css";

export default function ChangePasswordButton({className,...rest}) {
  return (
    <Button type="submit" className={`${css.button} ${className}`} {...rest}>
        <TbLockPassword/> Change Password
    </Button>
  );
}
