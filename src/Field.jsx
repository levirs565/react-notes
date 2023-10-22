import React from "react";
import { useContext } from "react";
import "./Field.css";

const InputIdContext = React.createContext();

export function FieldInput({ as, ...rest }) {
  const inputId = useContext(InputIdContext);
  const Component = as;
  return <Component className={"field--input"} id={inputId} {...rest} />;
}

export function FieldLabel({ children }) {
  const inputId = useContext(InputIdContext);
  return (
    <label className="field--label" htmlFor={inputId}>
      {children}
    </label>
  );
}

export function FieldMessage({ children, error }) {
  return (
    <p className={`field--message ${error ? "field--message--error" : ""}`}>
      {children}
    </p>
  );
}

export function Field({ inputId, children }) {
  return (
    <InputIdContext.Provider value={inputId}>
      <div className="field">{children}</div>
    </InputIdContext.Provider>
  );
}
