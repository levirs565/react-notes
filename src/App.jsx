import React, { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { createNote, getInitialNotes, htmlInnerText } from "./utils";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { ActiveNotePageWrapper } from "./pages/ActiveNotePage";
import { ArchiveNotePageWrapper } from "./pages/ArchiveNotePage";
import { NoteAddDialogWrapper } from "./dialog/NoteAddDialog";
import { NoteDetailsDialogWrapper } from "./dialog/NoteDetailsDialog";

/*
  AppMain dipisah menjadi Router agar NavLink di TopBar mendapatkan location
  dari currentLocation di App
 */

function AppMain({ searchQuery, onSearchQueryChange }) {
  return (
    <React.Fragment>
      <TopBar searchQuery={searchQuery} onSearchChange={onSearchQueryChange} />
      <Outlet />
    </React.Fragment>
  );
}

export function App() {
  const [notes, setNotes] = useState(() => {
    const prevNotes = localStorage.getItem("notes");
    return prevNotes ? JSON.parse(prevNotes) : getInitialNotes();
  });
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const currentLocation = backgroundLocation ?? location;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const lowerCasedQuery = searchQuery.toLowerCase();
  const filteredNotes = notes.filter(
    ({ title, body }) =>
      htmlInnerText(title).toLowerCase().includes(lowerCasedQuery) ||
      htmlInnerText(body).toLowerCase().includes(lowerCasedQuery)
  );

  const onSearchQueryChangedHandler = (query) => {
    setSearchQuery(query);
  };
  const onNoteDeleteHandler = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id != id));
  };
  const onNoteChangeArchiveHandler = (id, archived) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id != id
          ? note
          : {
              ...note,
              archived,
            }
      )
    );
  };
  const onNoteUpdateHandler = (note) => {
    setNotes((prevNotes) =>
      prevNotes.map((currentNote) =>
        currentNote.id == note.id ? note : currentNote
      )
    );
  };
  const onNoteAddHandler = (data) => {
    const newNote = createNote(data);
    setNotes((prevNotes) => [...prevNotes, newNote]);
    return newNote;
  };

  return (
    <React.Fragment>
      <div inert={backgroundLocation ? "" : undefined}>
        <Routes location={currentLocation}>
          <Route
            path="/"
            element={
              <AppMain
                searchQuery={searchQuery}
                onSearchQueryChange={onSearchQueryChangedHandler}
              />
            }
          >
            <Route
              path="/"
              element={
                <ActiveNotePageWrapper
                  notes={filteredNotes}
                  searchQuery={searchQuery}
                  onSearchQueryChanged={onSearchQueryChangedHandler}
                  onNoteAdd={onNoteAddHandler}
                />
              }
            />
            <Route
              path="/archive"
              element={
                <ArchiveNotePageWrapper
                  notes={filteredNotes}
                  searchQuery={searchQuery}
                  onSearchQueryChanged={onSearchQueryChangedHandler}
                />
              }
            />
          </Route>
        </Routes>
      </div>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/note/add"
            element={<NoteAddDialogWrapper onSubmit={onNoteAddHandler} />}
          />
          <Route
            path="/note/:id"
            element={
              <NoteDetailsDialogWrapper
                onNoteDelete={onNoteDeleteHandler}
                onNoteChangeArchive={onNoteChangeArchiveHandler}
                onNoteUpdate={onNoteUpdateHandler}
                notes={notes}
              />
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
}
