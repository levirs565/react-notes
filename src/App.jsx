import React, { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { createNote, getInitialNotes, htmlInnerText } from "./utils";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { ActiveNotePageWrapper } from "./pages/ActiveNotePage";
import { ArchiveNotePageWrapper } from "./pages/ArchiveNotePage";
import { NoteAddDialogWrapper } from "./dialog/NoteAddDialog";
import { NoteDetailsDialogWrapper } from "./dialog/NoteDetailsDialog";
import PropTypes from "prop-types";
import {
  createToValidNavigation,
  isInvalidLocation,
  useEnhancedLocation,
  useSyncLastBackgroundLocation,
} from "./routes";

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

AppMain.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
};

export function App() {
  const [notes, setNotes] = useState(() => {
    const prevNotes = localStorage.getItem("notes");
    return prevNotes ? JSON.parse(prevNotes) : getInitialNotes();
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const enhancedLocation = useEnhancedLocation();

  useSyncLastBackgroundLocation(enhancedLocation);

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

  if (isInvalidLocation(enhancedLocation))
    return <Navigate {...createToValidNavigation(enhancedLocation)} />;

  return (
    <React.Fragment>
      <div inert={enhancedLocation.hasModal ? "" : undefined}>
        <Routes location={enhancedLocation.currentLocation}>
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

      {enhancedLocation.hasModal && (
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
