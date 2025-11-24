import Card from '../../ui/Card/Card';
import css from './EmptyCard.module.css';
import { FaBoxArchive } from "react-icons/fa6";

export default function EmptyCard({}) {
  return (
    <Card className={css.card}>
        <FaBoxArchive className={css.icon}/>
        <h3 className={css.title}>Not Found</h3>
        <p className={css.text}>You must create new one!</p>
    </Card>
  )
}
