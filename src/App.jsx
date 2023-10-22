import React from "react";
import { NoteList } from "./Note";
import { TopBar } from "./TopBar";
import AddNoteDialog from "./AddNoteDialog";
import "./App.css";
import { createNote, getInitialNotes } from "./utils";

class App extends React.Component {
  constructor() {
    super();
    const prevNotes = localStorage.getItem("notes");
    this.state = {
      searchQuery: "",
      isAddDialogOpen: false,
      notes: prevNotes ? JSON.parse(prevNotes) : getInitialNotes(),
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
        notes: [...this.state.notes, createNote(data)],
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

    this.onChangeSearchQueryHandler = (query) => {
      this.setState({
        ...this.state,
        searchQuery: query,
      });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes != this.state.notes) {
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    }
  }

  render() {
    const lowerCasedQuery = this.state.searchQuery.toLowerCase();
    const filteredNotes = this.state.notes.filter(
      ({ title, body }) =>
        title.toLowerCase().includes(lowerCasedQuery) ||
        body.toLowerCase().includes(lowerCasedQuery)
    );
    return (
      <React.Fragment>
        <TopBar
          searchQuery={this.state.searchQuery}
          onChangeSearch={this.onChangeSearchQueryHandler}
        />
        <main>
          <section className="app-section">
            <h2 className="app-section--title">Catatan</h2>
            <NoteList
              list={filteredNotes.filter(({ archived }) => !archived)}
              onDeleteItem={this.onNoteDeleteHandler}
              onChangeItemArchive={this.onNoteChangeArchiveHandler}
              emptyMessage={"Catatan Kosong"}
            />
          </section>
          <section className="app-section">
            <h2 className="app-section--title">Arsip</h2>
            <NoteList
              list={filteredNotes.filter(({ archived }) => archived)}
              onDeleteItem={this.onNoteDeleteHandler}
              onChangeItemArchive={this.onNoteChangeArchiveHandler}
              emptyMessage={"Arsip catatan kosong"}
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
