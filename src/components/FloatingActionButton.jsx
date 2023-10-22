import "./FloatingActionButton.css";

export function FloatingActionButton({ children, onClick }) {
  return (
    <button className="floating-action-button" onClick={onClick}>
      {children}
    </button>
  );
}
