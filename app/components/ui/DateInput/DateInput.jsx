import css from "./DateInput.module.css";

export default function DateInput({
  label = "date label",
  placeholder = "placeholder",
  name,
  ...rest
}) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <input
        className={css.input}
        type="datetime-local"
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
}
