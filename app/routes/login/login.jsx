import Wrapper from "../../components/shared/Wrapper/Wrapper";
import DateInput from "../../components/ui/DateInput/DateInput";
import EmailInput from "../../components/ui/EmailInput/EmailInput";
import Form from "../../components/ui/Form/Form";
import NumberInput from "../../components/ui/NumberInput/NumberInput";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import SelectInput from "../../components/ui/SelectInput/SelectInput";
import TextAreaInput from "../../components/ui/TextAreaInput/TextAreaInput";
import TextInput from "../../components/ui/TextInput/TextInput";
import css from "./login.module.css";

export default function LoginPage() {
  return (
    <Wrapper>
      <Form title="Login">
        <EmailInput label="email"/>
        <PasswordInput label="password"/>
      </Form>
    </Wrapper>
  );
}
