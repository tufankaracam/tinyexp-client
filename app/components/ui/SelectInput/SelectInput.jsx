import css from "./SelectInput.module.css";

export default function SelectInput({
  label = "date label",
  placeholder = "placeholder",
  name,
  defaultValue = "",
  data = ['a','b'],
  error,
  ...rest
}) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <select
        className={css.input}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
        {...rest}
      >
        <option value="" disabled>Choose option</option>
        {data?.map((d) => (
          <option value={d?.id}>{d?.name}</option>
        ))}
      </select>
      {error && (<span className={css.error}>{error}</span>)}
    </label>
  );
}
