import React from "react";
import { NoteList } from "./Note";
import { TopBar } from "./TopBar";
import AddNoteDialog from "./AddNoteDialog";

class App extends React.Component {
  constructor() {
    super();
    const prevNotes = localStorage.getItem("notes");
    this.state = {
      isAddDialogOpen: false,
      notes: prevNotes
        ? JSON.parse(prevNotes)
        : [
            this.createNote({
              title: "Test",
              body: "Test Kontent",
            }),
          ],
    };

    this.onAddFabClickHandler = () => {
      this.setState({
        ...this.state,
        isAddDialogOpen: true,
      });
    };
    this.onDialogChangeHandler = (state) => {
      this.setState({
        ...this.state,
        isAddDialogOpen: state,
      });
    };
    this.onDialogSubmitHandler = (data) => {
      this.setState({
        ...this.state,
        notes: [...this.state.notes, this.createNote(data)],
      });
    };

    this.onNoteDeleteHandler = (id) => {
      this.setState({
        ...this.state,
        notes: this.state.notes.filter((note) => note.id != id),
      });
    };
  }

  createNote(data) {
    const date = new Date();
    return {
      ...data,
      id: +date,
      archived: false,
      createdAt: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes != this.state.notes) {
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <main>
          <NoteList
            list={this.state.notes}
            onDeleteItem={this.onNoteDeleteHandler}
          />
          <button className="app-fab" onClick={this.onAddFabClickHandler}>
            +
          </button>
          <AddNoteDialog
            open={this.state.isAddDialogOpen}
            onChange={this.onDialogChangeHandler}
            onSubmit={this.onDialogSubmitHandler}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
