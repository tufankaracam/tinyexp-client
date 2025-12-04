import { IoLogOutOutline } from "react-icons/io5";

import Button from "../../ui/Button/Button";
import css from "./LogoutButton.module.css";

export default function LogoutButton({className,...rest}) {
  return (
    <Button type="submit" className={`${css.button} ${className}`} {...rest}>
        <IoLogOutOutline/> Logout
    </Button>
  );
}
