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

export default function ActivityLogCard({text="Reading Book",value="15 sayfa"}) {
  return (
    <Card>
      <div className={css.header}>
        <ul>
          <li>2025.01.01</li>
          <li>14:00</li>
        </ul>
        <div>
          <XPBadge xp={100} />
        </div>
      </div>
      <Line/>
        <InfoTextFree label={text} value={value} />
      <Line />
      <InputGroup>
        <EditButton />
        <DeleteButton />
      </InputGroup>
    </Card>
  );
}
