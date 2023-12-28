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
import { useI8n } from "../provider/context";

function LoginPage() {
  const { user } = useLoggedUser();
  const loginUser = useLoginUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { getText } = useI8n();

  if (user) return <Navigate to="/" />;

  return (
    <CardForm
      onSubmit={handleSubmit((data) => loginUser(data.email, data.password))}
    >
      <CardFormHeader>
        <CardFormTitle>{getText("loginAction")}</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          {getText("notHaveAccountMessage")}{" "}
          <Link to="/register">{getText("registerAction")}</Link>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>{getText("emailField")}</FieldLabel>
          <FieldInput
            {...register("email", {
              required: {
                value: true,
                message: getText("emailCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="password">
          <FieldLabel>{getText("passwordField")}</FieldLabel>
          <FieldInput
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: getText("passwordCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton variant="primary">{getText("loginAction")}</AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function LoginPageWrapper() {
  return <LoginPage />;
}
