import css from './InputGroup.module.css';

export default function InputGroup({children}) {
  return (
    <div className={css.inputgroup}>
        {children}
    </div>
  )
}
