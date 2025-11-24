import css from "./InfoGroup.module.css";

export default function InfoGroup({ children }) {
  return <div className={css.infogroup}>{children}</div>;
}
