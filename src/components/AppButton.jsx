import "./AppButton.css";

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

export function AppButtonGroupSpacer() {
  return <div className="app-button-group-spacer"></div>;
}

export function AppButtonGroup({ className, children }) {
  return <div className={`app-button-group ${className}`}>{children}</div>;
}
