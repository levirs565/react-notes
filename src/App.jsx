import React from "react";
import { TopBar } from "./components/TopBar";
import { createNote, getInitialNotes } from "./utils";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ActiveNotePageWrapper } from "./pages/ActiveNotePage";
import { ArchiveNotePageWrapper } from "./pages/ArchiveNotePage";

export class App extends React.Component {
  constructor() {
    super();
    const prevNotes = localStorage.getItem("notes");
    this.state = {
      searchQuery: "",
      notes: prevNotes ? JSON.parse(prevNotes) : getInitialNotes(),
    };

    this.onSearchChangeQueryHandler = (query) => {
      this.setState({
        ...this.state,
        searchQuery: query,
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

    this.onNoteAddHandler = (data) => {
      this.setState({
        ...this.state,
        notes: [...this.state.notes, createNote(data)],
      });
    };

    this.onSearchQueryChangedHandler = (data) => {
      this.setState({
        ...this.state,
        searchQuery: data,
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
          onSearchChange={this.onSearchChangeQueryHandler}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ActiveNotePageWrapper
                notes={filteredNotes}
                searchQuery={this.state.searchQuery}
                onSearchQueryChanged={this.onSearchQueryChangedHandler}
                onNoteAdd={this.onNoteAddHandler}
                onNoteChangeArchive={this.onNoteChangeArchiveHandler}
                onNoteDelete={this.onNoteDeleteHandler}
              />
            }
          />
          <Route
            path="/archive"
            element={
              <ArchiveNotePageWrapper
                notes={filteredNotes}
                searchQuery={this.state.searchQuery}
                onSearchQueryChanged={this.onSearchQueryChangedHandler}
              />
            }
          />
        </Routes>
      </React.Fragment>
    );
  }
}
