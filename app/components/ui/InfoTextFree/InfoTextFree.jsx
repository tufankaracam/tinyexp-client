import css from './InfoTextFree.module.css';

export default function InfoTextFree({label,value}) {
  return (
    <div className={css.infotext}>
        <div className={css.label} >{label}:</div>
        <div className={css.value} >{value}</div>
    </div>
  )
}
