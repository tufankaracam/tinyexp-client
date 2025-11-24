import css from "./Card.module.css";

export default function Card({ backgroundColor,className, borderColor, children }) {
  return (
    <div className={`${css.card} ${className ? className : ""}`} style={{ backgroundColor, borderColor }}>
      {children}
    </div>
  );
}
