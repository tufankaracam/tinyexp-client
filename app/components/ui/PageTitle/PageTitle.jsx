import css from './PageTitle.module.css';

export default function PageTitle({value,subvalue}) {
  return (
    <div className={css.titletext}><div className={css.value}>{value}</div> {subvalue && (<span className={css.subvalue}>({subvalue})</span>)}</div>
  )
}
