import { Navigate, useNavigate } from 'react-router';
import css from './BottomMenu.module.css';
export default function BottomMenu() {

    const navigate = useNavigate();

  return (
    <div className={css.bottommenu}>
        <button className={css.bottommenuuitem} onClick={()=>{navigate('/')}}>Dashboard</button>
        <button className={css.bottommenuuitem} onClick={()=>{navigate('/categories')}}>Categories</button>
        <button className={css.bottommenuuitem} onClick={()=>{navigate('/activitylogs')}}>Logs</button>
    </div>
  )
}
