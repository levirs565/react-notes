import React from "react";
import "./AddNoteDialog.css";

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
          <label className="add-note-dialog--label" htmlFor="titleInput">
            Judul:{" "}
          </label>
          <input
            className="add-note-dialog--input"
            id="titleInput"
            type="text"
            value={this.state.title}
            onChange={this.onTitleInputChangeHandler}
          />
          <p>{this.state.remainingTitle} karakter tersisa</p>
          <label className="add-note-dialog--label" htmlFor="bodyInput">
            Konten:
          </label>
          <textarea
            className="add-note-dialog--input"
            id="bodyInput"
            value={this.state.body}
            onChange={this.onBodyInputChangeHandler}
          ></textarea>
          <div className="add-note-dialog--buttons">
            <button className="button">Cancel</button>
            <button
              className="button button--primary"
              onClick={this.onAddButtonClickHandler}
            >
              Tambah
            </button>
          </div>
        </form>
      </dialog>
    );
  }
}
