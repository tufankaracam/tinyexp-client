import css from './TitleText.module.css';

export default function TitleText({value,padding,color="white"},fontSize="31") {
  return (
    <div className={css.titletext} style={{color,fontSize:`${fontSize}px`}}>{value}</div>
  )
}
