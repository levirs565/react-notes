import React from "react";
import { useContext } from "react";
import "./Field.css";
import { AppInput } from "./AppInput";

const InputIdContext = React.createContext();

export class FieldInput extends React.Component {
  static contextType = InputIdContext;

  render() {
    const inputId = this.context;
    const { className, ...rest } = this.props;
    return (
      <AppInput
        className={`field--input ${className ? className : ""}`}
        id={inputId}
        {...rest}
      />
    );
  }
}

export class FieldLabel extends React.Component {
  static contextType = InputIdContext;

  render() {
    const inputId = this.context;
    return (
      <label className="field--label" htmlFor={inputId}>
        {this.props.children}
      </label>
    );
  }
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
