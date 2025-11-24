import css from './Button.module.css';

export default function Button({backgroundColor,color,className,children,...rest}) {
  return (
    <button className={`${css.button} ${className || ''}`} style={{backgroundColor,color}} {...rest}>{
        children
    }</button>
  )
}
