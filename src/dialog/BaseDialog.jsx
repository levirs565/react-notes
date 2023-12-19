import { useEffect } from "react";
import { useRef } from "react";
import "./BaseDialog.css";

export function BaseDialog({
  open,
  className,
  onClose,
  children,
  onCloseTransitionEnd,
}) {
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current)
      setTimeout(() => {
        if (open) dialogRef.current.showModal();
        else dialogRef.current.close();
      }, 1);
  }, [open]);

  return (
    <dialog
      className={["base-dialog", className].join(" ")}
      ref={dialogRef}
      onClose={onClose}
      onAnimationEnd={(e) => {
        if (e.animationName === "dialog-close") onCloseTransitionEnd();
      }}
    >
      {children}
    </dialog>
  );
}

export function BaseDialogForm({ children }) {
  return (
    <form className="base-dialog--form" method="dialog">
      {children}
    </form>
  );
}

export function BaseDialogScrollable({ children }) {
  return <div className="base-dialog--scroll">{children}</div>;
}

export function BaseDialogFooter({ children }) {
  return <div className="base-dialog--footer">{children}</div>;
}
