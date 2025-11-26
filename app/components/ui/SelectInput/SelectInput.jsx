import css from "./SelectInput.module.css";

export default function SelectInput({
  label = "date label",
  placeholder = "placeholder",
  name,
  data = ['a','b'],
  ...rest
}) {
  return (
    <label className={css.container}>
      <span className={css.label}>{label}</span>
      <select
        className={css.input}
        type="datetime-local"
        name={name}
        placeholder={placeholder}
        defaultValue={""}
        required
        {...rest}
      >
        <option value="" disabled>Choose option</option>
        {data?.map((d) => (
          <option value={d}>{d}</option>
        ))}
      </select>
    </label>
  );
}
