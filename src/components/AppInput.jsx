import "./AppInput.css";
import PropTypes from "prop-types";

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

AppInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
};
