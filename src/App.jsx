import React from "react";
import { NoteList } from "./Note";
import { TopBar } from "./TopBar";
import AddNoteDialog from "./AddNoteDialog";
import "./App.css";

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
    this.onNoteChangeArchiveHandler = (id, archived) => {
      this.setState({
        ...this.state,
        notes: this.state.notes.map((note) =>
          note.id != id
            ? note
            : {
                ...note,
                archived,
              }
        ),
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
          <section className="app-section">
            <h2 className="app-section--title">Catatan</h2>
            <NoteList
              list={this.state.notes.filter(({ archived }) => !archived)}
              onDeleteItem={this.onNoteDeleteHandler}
              onChangeItemArchive={this.onNoteChangeArchiveHandler}
            />
          </section>
          <section className="app-section">
            <h2 className="app-section--title">Arsip</h2>
            <NoteList
              list={this.state.notes.filter(({ archived }) => archived)}
              onDeleteItem={this.onNoteDeleteHandler}
              onChangeItemArchive={this.onNoteChangeArchiveHandler}
            />
          </section>
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
