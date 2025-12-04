import { IoIosAddCircleOutline } from "react-icons/io";

import Button from "../../ui/Button/Button";
import css from "./TrackingTypeAddButton.module.css";
import { useNavigate } from "react-router";

export default function TrackingTypeAddButton({ ...rest }) {
  const navigate = useNavigate();
  return (
    <Button className={css.button} onClick={()=>{navigate('/trackingtypes')}} {...rest}>
      <IoIosAddCircleOutline size={24} />
      Add Tracking Type
    </Button>
  );
}
