import css from './InfoText.module.css';

export default function InfoText({label,value}) {
  return (
    <div className={css.infotext}>
        <div className={css.label} >{label}:</div>
        <div className={css.value} >{value}</div>
    </div>
  )
}
