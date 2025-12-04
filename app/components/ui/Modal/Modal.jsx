import ModalCloseButton from "../../shared/ModalCloseButton/ModalCloseButton";
import css from "./Modal.module.css";

export default function Modal({ isOpen, close, children }) {
  return (
    isOpen && (
      <div className={css.modal}>
        <div
          className={css.content}
          onClick={(e) => {
            if (e.target == e.currentTarget) {
              close();
            }
          }}
        >
          {children}
        </div>
      </div>
    )
  );
}
