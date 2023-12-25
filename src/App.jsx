import React, { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { createNote, getInitialNotes } from "./utils";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { ActiveNotePageWrapper } from "./pages/ActiveNotePage";
import { ArchiveNotePageWrapper } from "./pages/ArchiveNotePage";
import { NoteAddDialogWrapper } from "./dialog/NoteAddDialog";
import { NoteDetailsDialogWrapper } from "./dialog/NoteDetailsDialog";
import {
  createToValidNavigation,
  isInvalidLocation,
  useEnhancedLocation,
  useSyncLastBackgroundLocation,
} from "./routes";
import { NotFoundPageWrapper } from "./pages/NotFoundPage";
import { useSearchQuery } from "./pages/utils";

/*
  AppMain dipisah menjadi Router agar NavLink di TopBar mendapatkan location
  dari currentLocation di App
 */

function AppMain() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, onSearchQueryChange] = useSearchQuery();
  console.log(searchQuery);
  return (
    <React.Fragment>
      <TopBar
        showSearch={showSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchQueryChange}
      />
      <Outlet
        context={{
          showSearch,
          setShowSearch,
        }}
      />
    </React.Fragment>
  );
}

export function App() {
  const [notes, setNotes] = useState(() => {
    const prevNotes = localStorage.getItem("notes");
    return prevNotes ? JSON.parse(prevNotes) : getInitialNotes();
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const enhancedLocation = useEnhancedLocation();

  useSyncLastBackgroundLocation(enhancedLocation);

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
          <Route path="/" element={<AppMain />}>
            <Route
              path="/"
              element={
                <ActiveNotePageWrapper
                  notes={notes}
                  onNoteAdd={onNoteAddHandler}
                />
              }
            />
            <Route
              path="/archive"
              element={<ArchiveNotePageWrapper notes={notes} />}
            />
            <Route path="*" element={<NotFoundPageWrapper />} />
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
