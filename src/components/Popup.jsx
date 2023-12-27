import "./Popup.css";

export function Popup({ children }) {
  return <div className="popup">{children}</div>;
}

export function PopupContent({ children }) {
  return <div className="popup--content">{children}</div>;
}

export function PopupItem({ children, clickable, onClick }) {
  const As = clickable ? "button" : "div";
  return (
    <As
      className={["popup-item", clickable ? "popup-item--clickable" : ""].join(
        " "
      )}
      onClick={onClick}
    >
      {children}
    </As>
  );
}

export function PopupItemIcon({ children }) {
  return <div className="popup-item--icon">{children}</div>;
}

export function PopupItemText({ children }) {
  return <div className="popup-item--text">{children}</div>;
}
