import css from './Breadcrumb.module.css';

export default function Breadcrumb({data=[]}) {
  return (
    <div className={css.breadcrumb}>
        {
            data?.map((b)=>(<div className={css.route} key={b.url}><a href={b.url}>{b.name}</a></div>))
        }
    </div>
  )
}
