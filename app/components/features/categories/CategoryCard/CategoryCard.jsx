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
import { calculateExpData } from "../../../../helpers/expHelper";
export default function CategoryCard({
  id,
  name,
  data,
  type = "category",
  level = 0,
  xp = 0,
  nextxp=1,
  logs = 0,
  trackingtype=null,
  value=null,
  subcount = 0,
  activitycount = 0,
  openLink=null,
  onEdit=null,
  onDelete=null
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = ()=>{
    navigate(openLink,{state:location});
  }
  console.log('-------------------')
  console.log(onEdit);
  const expData = calculateExpData(parseInt(data?.activityexp));
  console.log(expData)
  return (
    <Card className={css.card}>
      <TitleText value={name} />
      {type!="trackingtype" && (<InfoGroup>
        {<InfoText label={"Level"} value={expData?.level} />}
        {<InfoText label={"Xp"} value={expData?.currentExp} />}
        {<InfoText label={"Logs"} value={data?.activitylogcount} />}
        {(trackingtype && value) && (
          <InfoText label={trackingtype} value={value} />
        )}
      </InfoGroup>)}
      
      {expData?.requiredTotalExp>0 && (<ProgressBar color="#F2B90D" maxValue={expData?.requiredTotalExp} value={expData?.currentExp} height={21} />)}
      

      <InfoGroup>
          {data?.categorycount !=undefined && (<InfoTextFree label="Categories" value={data?.categorycount} />)}
          {data?.subcategorycount !=undefined && (<InfoTextFree label="Subcategories" value={data?.subcategorycount} />)}
          {data?.activitycount !=undefined && (<InfoTextFree label="Activities" value={data?.activitycount} />) }
        </InfoGroup>

        {(onEdit || onDelete || openLink) && (<Line />)}
      
      <InputGroup>
        {onEdit && (<EditButton onClick={onEdit}/>)}
        {onDelete && (<DeleteButton onClick={onDelete}/>)}
        {openLink && (<OpenButton onClick={handleOpen} />)}
      </InputGroup>
    </Card>
  );
}
