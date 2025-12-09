import css from "./NumberInput.module.css";

export default function NumberInput({
  label = "number label",
  placeholder = "placeholder",
  name,
  error,
  ...rest
}) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <input
        className={css.input}
        type="number"
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className={css.error}>{error}</span>}
    </label>
  );
}
