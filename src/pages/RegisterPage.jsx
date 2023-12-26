import { Link } from "react-router-dom";
import {
  CardForm,
  CardFormContent,
  CardFormFooter,
  CardFormHeader,
  CardFormMessage,
  CardFormTitle,
} from "../components/CardForm";
import {
  Field,
  FieldInput,
  FieldLabel,
  ReactHookFieldMessage,
} from "../components/Field";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwordValue = watch("password");

  return (
    <CardForm onSubmit={handleSubmit(() => console.log("C"))}>
      <CardFormHeader>
        <CardFormTitle>Register</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          Sudah punya akun? <Link to="/login">Login</Link>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email tidak boleh kosong",
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="name">
          <FieldLabel>Nama</FieldLabel>
          <FieldInput
            {...register("name", {
              required: {
                value: true,
                message: "Nama tidak boleh kosong",
              },
            })}
          />
          <ReactHookFieldMessage error={errors.name} />
        </Field>
        <Field inputId="password">
          <FieldLabel>Password</FieldLabel>
          <FieldInput
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password tidak boleh kosong",
              },
              minLength: {
                value: 8,
                message: "Password minimal 8 karakter",
              },
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
        <Field inputId="passwordRetry">
          <FieldLabel>Ulangi Password</FieldLabel>
          <FieldInput
            type="password"
            {...register("passwordRetry", {
              deps: "password",
              validate: (value) =>
                value === passwordValue ? true : "Password harus sama",
            })}
          />
          <ReactHookFieldMessage error={errors.passwordRetry} />
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton variant="primary">Register</AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function RegisterPageWrapper() {
  return <RegisterPage />;
}
