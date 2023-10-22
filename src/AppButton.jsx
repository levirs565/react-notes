import "./AppButton.css";

export function AppButton({ className, variant, children, onClick }) {
  return (
    <button
      className={`app-button ${
        variant ? `app-button--${variant}` : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function AppButtonGroup({ className, children }) {
  return <div className={`app-button-group ${className}`}>{children}</div>;
}
