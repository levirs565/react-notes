import "./AppInput.css";

export function AppInput({ as, className, variant, ...rest }) {
  const Component = as ? as : "input";
  return (
    <Component
      className={`app-input ${variant ? `app-input--${variant}` : ""} ${
        className ? className : ""
      }`}
      {...rest}
    />
  );
}
