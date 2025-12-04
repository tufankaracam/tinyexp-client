import dayjs from "dayjs";
import AddButton from "../../../shared/AddButton/AddButton";
import DeleteButton from "../../../shared/DeleteButton/DeleteButton";
import EditButton from "../../../shared/EditButton/EditButton";
import XPBadge from "../../../shared/XPBadge/XPBadge";
import Card from "../../../ui/Card/Card";
import InfoText from "../../../ui/InfoText/InfoText";
import InfoTextFree from "../../../ui/InfoTextFree/InfoTextFree";
import InputGroup from "../../../ui/InputGroup/InputGroup";
import Line from "../../../ui/Line/Line";
import css from "./ActivityLogCard.module.css";
import { dateFormatToUI } from "../../../../helpers/dateHelper";

export default function ActivityLogCard({
  activityname = "Value",
  activityvalue = "15 sayfa",
  trackingtype = "sayfa",
  activityexp = 75,
  activitydate = "2025-11-11T20:30:00.000Z",
  activitynote = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, incidunt?",
  onEdit,
  onDelete
}) {
  return (
    <Card>
      <div className={css.header}>
        <ul>
          <li>{dateFormatToUI(activitydate, "date")}</li>
          <li>{dateFormatToUI(activitydate, "time")}</li>
        </ul>
        <div>
          <XPBadge xp={activityexp} />
        </div>
      </div>
      <Line />
      <InfoTextFree
        label={activityname}
        value={`${activityvalue} ${trackingtype}`}
      />
      <InfoTextFree
        label={"Note"}
        value={activitynote}
        flexDirection="column"
      />
      <Line />
      <InputGroup>
        <EditButton onClick={onEdit}/>
        <DeleteButton onClick={onDelete} />
      </InputGroup>
    </Card>
  );
}
