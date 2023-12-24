import React from "react";
import { AppInput } from "./AppInput";
import PropTypes from "prop-types";
import "./Field.css";

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

FieldInput.propTypes = {
  className: PropTypes.string,
};

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

FieldLabel.propTypes = {
  children: PropTypes.node,
};

export function FieldMessage({ children, error }) {
  return (
    <p className={`field--message ${error ? "field--message--error" : ""}`}>
      {children}
    </p>
  );
}

FieldMessage.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
};

export function Field({ inputId, children }) {
  return (
    <InputIdContext.Provider value={inputId}>
      <div className="field">{children}</div>
    </InputIdContext.Provider>
  );
}

Field.propTypes = {
  inputId: PropTypes.string.isRequired,
  children: PropTypes.node,
};
