import css from "./EmailInput.module.css";

export default function EmailInput({ label="text label",placeholder="placeholder", name, ...rest }) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <input className={css.input} type="email" name={name} placeholder={placeholder} {...rest} />
    </label>
  );
}
