import css from './XPBadge.module.css';

export default function XPBadge({xp=0}) {
  return (
    <div className={css.xpbadge}>
        {xp} XP
    </div>
  )
}
