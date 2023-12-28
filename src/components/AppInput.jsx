import { forwardRef } from "react";
import "./AppInput.css";
import PropTypes from "prop-types";

export const AppInput = forwardRef(function AppInput(
  { as, className, children, ...rest },
  ref
) {
  const Component = as ? as : "input";
  return (
    <div className={`app-input ${className ? className : ""}`}>
      {children}
      <Component className="app-input--input" {...rest} ref={ref} />
    </div>
  );
});

AppInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
