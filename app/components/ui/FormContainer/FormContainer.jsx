import CancelButton from "../../shared/CancelButton/CancelButton";
import SaveButton from "../../shared/SaveButton/SaveButton";
import css from "./FormContainer.module.css";
import {Form} from 'react-router';
import { IoCloseOutline } from "react-icons/io5";

export default function FormContainer({ title="Form Title",close,cancelClose=false,error,children,...rest }) {
  return (
    <Form className={css.form} {...rest}>
      {error && <span className={css.error}>{error}</span>}
      <div className={css.header}>
        <span className={css.title}>{title}</span>
        {close && (<button type="button" className={css.closebutton} onClick={close}>
          <IoCloseOutline />
        </button>)}
      </div>
      <div className={css.content}>
        {children}
      </div>
      <div className={css.footer}>
        <CancelButton onClick={()=>{if(cancelClose){close()}}} />
        <SaveButton />
      </div>
    </Form>
  );
}
