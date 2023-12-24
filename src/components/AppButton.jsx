import "./AppButton.css";
import PropTypes from "prop-types";

export function AppButton({ className, variant, children, onClick, disabled }) {
  return (
    <button
      className={`app-button ${variant ? `app-button--${variant}` : ""} ${
        className ? className : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

AppButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export function AppButtonGroupSpacer() {
  return <div className="app-button-group-spacer"></div>;
}

export function AppButtonGroup({ className, children }) {
  return <div className={`app-button-group ${className}`}>{children}</div>;
}

AppButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
