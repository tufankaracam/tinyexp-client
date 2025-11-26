import css from "./TextAreaInput.module.css";

export default function TextAreaInput({ label="textarea label",placeholder="placeholder", name, ...rest }) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <textarea rows={3} className={css.input} type="text" name={name} placeholder={placeholder} {...rest} />
    </label>
  );
}
