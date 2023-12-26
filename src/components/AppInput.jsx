import { forwardRef } from "react";
import "./AppInput.css";
import PropTypes from "prop-types";

export const AppInput = forwardRef(function AppInput(
  { as, className, variant, ...rest },
  ref
) {
  const Component = as ? as : "input";
  return (
    <Component
      className={`app-input ${variant ? `app-input--${variant}` : ""} ${
        className ? className : ""
      }`}
      {...rest}
      ref={ref}
    />
  );
});

AppInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
};
