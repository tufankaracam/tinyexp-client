import css from './ProgressBar.module.css';

export default function ProgressBar({value=25,maxValue=100,height=60,backgroundColor="#F2B90D"}) {
  return (
    <div className={css.progressbar}>
        <div className={css.info}>{`${value} / ${maxValue}`}</div>
        <div className={css.valuebar} style={{width:`${value/maxValue*100}%`,height:`${height}px`,backgroundColor}}></div>
    </div>
  )
}
