import css from "./TextInput.module.css";

export default function TextInput({ label="text label",placeholder="placeholder",error, name, ...rest }) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <input className={css.input} type="text" name={name} placeholder={placeholder} {...rest} />
      {error && (<span className={css.error}>{error}</span>)}
    </label>
  );
}
