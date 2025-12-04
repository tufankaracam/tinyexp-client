import css from './InfoTextFree.module.css';

export default function InfoTextFree({label,value,flexDirection='row',gap='3'}) {
  return (
    <div className={css.infotext} style={{flexDirection,gap}}>
        <div className={css.label} >{label}:</div>
        <div className={css.value} >{value}</div>
    </div>
  )
}
