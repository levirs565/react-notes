import { Link, Navigate } from "react-router-dom";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";
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
import { useForm } from "react-hook-form";
import { useLoggedUser, useLoginUser } from "../api";

function LoginPage() {
  const { user } = useLoggedUser();
  const loginUser = useLoginUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (user) return <Navigate to="/" />;

  return (
    <CardForm
      onSubmit={handleSubmit((data) => loginUser(data.email, data.password))}
    >
      <CardFormHeader>
        <CardFormTitle>Login</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          Tidak punya akun? <Link to="/register">Register</Link>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            {...register("email", {
              required: {
                value: true,
                message: "Email tidak boleh kosong",
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
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
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton variant="primary">Login</AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function LoginPageWrapper() {
  return <LoginPage />;
}
