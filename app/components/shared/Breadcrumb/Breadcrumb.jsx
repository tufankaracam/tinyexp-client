import css from './Breadcrumb.module.css';

export default function Breadcrumb({data=['aaaaa','bbbbb','ccccc']}) {
  return (
    <div className={css.breadcrumb}>
        {
            data?.map((r,i)=>(<div className={css.route} key={i}>{r}</div>))
        }
    </div>
  )
}
