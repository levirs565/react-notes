import { Link } from "react-router-dom";
import "./FloatingActionButton.css";

export function FloatingActionButton({ children, ...props }) {
  return (
    <Link className="floating-action-button" {...props}>
      {children}
    </Link>
  );
}
