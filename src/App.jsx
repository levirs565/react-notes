import React, { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { createNote, getInitialNotes } from "./utils";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { ActiveNotePageWrapper } from "./pages/ActiveNotePage";
import { ArchiveNotePageWrapper } from "./pages/ArchiveNotePage";
import { AddNoteDialogWrapper } from "./dialog/AddNoteDialog";

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
      title.toLowerCase().includes(lowerCasedQuery) ||
      body.toLowerCase().includes(lowerCasedQuery)
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
  const onNoteAddHandler = (data) => {
    setNotes((prevNotes) => [...prevNotes, createNote(data)]);
  };

  return (
    <React.Fragment>
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
                onNoteChangeArchive={onNoteChangeArchiveHandler}
                onNoteDelete={onNoteDeleteHandler}
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
                onNoteChangeArchive={onNoteChangeArchiveHandler}
                onNoteDelete={onNoteDeleteHandler}
              />
            }
          />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/note/add"
            element={<AddNoteDialogWrapper onSubmit={onNoteAddHandler} />}
          />
        </Routes>
      )}
    </React.Fragment>
  );
}
