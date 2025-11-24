import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import Button from "../../../ui/Button/Button";
import Card from "../../../ui/Card/Card";
import ProgressBar from "../../../ui/ProgressBar/ProgressBar";
import css from "./CategoryCard.module.css";
import InputGroup from "../../../ui/InputGroup/InputGroup";
import { FaArrowRight } from "react-icons/fa";
import Line from "../../../ui/Line/Line";
import TitleText from "../../../ui/TitleText/TitleText";
import InfoText from "../../../ui/InfoText/InfoText";
import InfoGroup from "../../../ui/InfoGroup/InfoGroup";
import EditButton from "../../../shared/EditButton/EditButton";
import DeleteButton from "../../../shared/DeleteButton/DeleteButton";
import OpenButton from "../../../shared/OpenButton/OpenButton";
import InfoTextFree from "../../../ui/InfoTextFree/InfoTextFree";
import { useLocation, useNavigate } from "react-router";
export default function CategoryCard({
  id,
  name,
  type = "category",
  level = 0,
  xp = 0,
  nextxp=1,
  logs = 0,
  trackingtype=null,
  value=null,
  subcount = 0,
  activitycount = 0,
  open
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = ()=>{
    switch(type){
      case "category":
        navigate('/subcategories',{state:location});
        break;
      case "subcategory":
        navigate('/activities',{state:location});
        break;
      case "activity":
        navigate('/activitylogs',{state:location});
        break;
      default:
        navigate('/')
        break;
    }
  }

  return (
    <Card className={css.card}>
      <TitleText value={name} />
      <InfoGroup>
        {level != undefined && <InfoText label={"Level"} value={level} />}
        {xp != undefined && <InfoText label={"Xp"} value={xp} />}
        {logs != undefined && <InfoText label={"Logs"} value={logs} />}
        {(trackingtype && value) && (
          <InfoText label={trackingtype} value={value} />
        )}
      </InfoGroup>
      <ProgressBar color="#F2B90D" maxValue={nextxp} value={xp} height={21} />

      {type == "category" && (
        <InfoGroup>
          <InfoTextFree label="Subcategories" value={subcount} />
          <InfoTextFree label="Activities" value={activitycount} />
        </InfoGroup>
      )}

      {type == "subcategory" && (
        <InfoGroup>
          <InfoTextFree label="Activities" value={activitycount} />
        </InfoGroup>
      )}

      <Line />
      <InputGroup>
        <EditButton />
        <DeleteButton />
        <OpenButton onClick={handleOpen} />
      </InputGroup>
    </Card>
  );
}
