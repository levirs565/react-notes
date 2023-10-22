import React from "react";
import "./AddNoteDialog.css";
import { AppButton, AppButtonGroup } from "./AppButton";
import { Field, FieldInput, FieldLabel, FieldMessage } from "./Field";

export default class AddNoteDialog extends React.Component {
  constructor() {
    super();

    this.dialogElement = null;
    this.setDialogElementRef = (element) => {
      this.dialogElement = element;
    };

    const maxTitleLength = 50;
    const initialState = {
      title: "",
      body: "",
      remainingTitle: maxTitleLength,
    };

    this.onDialogCloseHandler = () => {
      this.props.onChange(false);
      this.setState({
        ...initialState,
      });
    };

    this.state = { ...initialState };
    this.onBodyInputChangeHandler = (inputEl) => {
      this.setState({
        ...this.state,
        body: inputEl.target.value,
      });
    };

    this.onTitleInputChangeHandler = (inputEl) => {
      let value = inputEl.target.value;
      if (value.length > maxTitleLength) {
        value = value.substring(0, maxTitleLength);
      }
      this.setState({
        ...this.state,
        title: value,
        remainingTitle: maxTitleLength - value.length,
      });
    };

    this.onAddButtonClickHandler = () => {
      this.props.onSubmit({
        title: this.state.title,
        body: this.state.body,
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      if (this.props.open) {
        this.dialogElement.showModal();
      }
    }
  }

  render() {
    return (
      <dialog
        ref={this.setDialogElementRef}
        className="add-note-dialog"
        onClose={this.onDialogCloseHandler}
      >
        <form method="dialog">
          <h2 className="add-note-dialog--title">Tambah Catatan</h2>
          <div className="add-note-dialog--body">
            <Field inputId="titleInput">
              <FieldLabel>Judul: </FieldLabel>
              <FieldInput
                as="input"
                value={this.state.title}
                onChange={this.onTitleInputChangeHandler}
                type="text"
                variant="primary"
                className="add-note-dialog--input"
              />
              <FieldMessage>
                {this.state.remainingTitle} karakter tersisa
              </FieldMessage>
              {this.state.title.length === 0 ? (
                <FieldMessage error>Judul tidak boleh kosong</FieldMessage>
              ) : null}
            </Field>
            <Field inputId="bodyInput">
              <FieldLabel>Konten: </FieldLabel>
              <FieldInput
                as="textarea"
                value={this.state.body}
                onChange={this.onBodyInputChangeHandler}
                variant="primary"
                className="add-note-dialog--input"
              ></FieldInput>
            </Field>
          </div>
          <AppButtonGroup className="add-note-dialog--buttons">
            <AppButton>Cancel</AppButton>
            <AppButton
              disabled={this.state.title.length === 0}
              variant="danger"
              onClick={this.onAddButtonClickHandler}
            >
              Tambah
            </AppButton>
          </AppButtonGroup>
        </form>
      </dialog>
    );
  }
}
