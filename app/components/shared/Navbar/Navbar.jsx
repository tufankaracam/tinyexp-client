import css from './Navbar.module.css';
export default function Navbar() {
  return (
    <div className={css.navbar}>
      <span className={css.logo}>TinyExp</span>
    </div>
  )
}
