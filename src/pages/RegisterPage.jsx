import { Link, useNavigate } from "react-router-dom";
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
import { useRegisterUser } from "../api";
import { useI8n } from "../provider/context";

function RegisterPage() {
  const navigate = useNavigate();
  const registerUser = useRegisterUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const passwordValue = watch("password");
  const { getText } = useI8n();

  return (
    <CardForm
      onSubmit={handleSubmit((data) =>
        registerUser(data.name, data.email, data.password).then(() =>
          navigate("/login")
        )
      )}
    >
      <CardFormHeader>
        <CardFormTitle>{getText("registerAction")}</CardFormTitle>
      </CardFormHeader>
      <CardFormContent>
        <CardFormMessage>
          {getText("haveAccountMessage")}{" "}
          <Link to="/login">{getText("loginAction")}</Link>
        </CardFormMessage>
        <Field inputId="email">
          <FieldLabel>{getText("emailField")}</FieldLabel>
          <FieldInput
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: getText("emailCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.email} />
        </Field>
        <Field inputId="name">
          <FieldLabel>{getText("nameField")}</FieldLabel>
          <FieldInput
            {...register("name", {
              required: {
                value: true,
                message: getText("nameCannotBlankMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.name} />
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
              minLength: {
                value: 8,
                message: getText("passwordMinimalMessage"),
              },
            })}
          />
          <ReactHookFieldMessage error={errors.password} />
        </Field>
        <Field inputId="passwordRetry">
          <FieldLabel>{getText("repeatPasswordField")}</FieldLabel>
          <FieldInput
            type="password"
            {...register("passwordRetry", {
              deps: "password",
              validate: (value) =>
                value === passwordValue
                  ? true
                  : getText("passwordMustEqualMessage"),
            })}
          />
          <ReactHookFieldMessage error={errors.passwordRetry} />
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton variant="primary">{getText("registerAction")}</AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

export function RegisterPageWrapper() {
  return <RegisterPage />;
}
