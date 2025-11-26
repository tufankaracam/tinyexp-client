import css from "./PasswordInput.module.css";

export default function PasswordInput({ label="password label",placeholder="placeholder", name, ...rest }) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <input className={css.input} type="password" name={name} placeholder={placeholder} {...rest} />
    </label>
  );
}
