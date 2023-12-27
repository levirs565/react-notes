import React, { useState } from "react";
import { createNote, getInitialNotes } from "./utils";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { MainLayout } from "./layout/MainLayout";
import { LoginPageWrapper } from "./pages/LoginPage";
import { RegisterPageWrapper } from "./pages/RegisterPage";

export function App() {
  const enhancedLocation = useEnhancedLocation();

  useSyncLastBackgroundLocation(enhancedLocation);

  if (isInvalidLocation(enhancedLocation))
    return <Navigate {...createToValidNavigation(enhancedLocation)} />;

  return (
    <React.Fragment>
      <div inert={enhancedLocation.hasModal ? "" : undefined}>
        <Routes location={enhancedLocation.currentLocation}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<ActiveNotePageWrapper />} />
            <Route path="/archive" element={<ArchiveNotePageWrapper />} />
            <Route path="*" element={<NotFoundPageWrapper />} />
          </Route>

          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/register" element={<RegisterPageWrapper />} />
        </Routes>
      </div>

      {enhancedLocation.hasModal && (
        <Routes>
          <Route path="/note/add" element={<NoteAddDialogWrapper />} />
          <Route path="/note/:id" element={<NoteDetailsDialogWrapper />} />
        </Routes>
      )}
    </React.Fragment>
  );
}
