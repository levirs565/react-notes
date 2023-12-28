import { useEffect, useState } from "react";
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
import { ThemeContext } from "./context";
import { useLocalStorageState } from "./hook";

export function App() {
  const enhancedLocation = useEnhancedLocation();

  const [theme, setTheme] = useLocalStorageState("theme", "");
  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "" : "dark"));

  useSyncLastBackgroundLocation(enhancedLocation);

  if (isInvalidLocation(enhancedLocation))
    return <Navigate {...createToValidNavigation(enhancedLocation)} />;

  return (
    <div className="app" data-theme={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
      </ThemeContext.Provider>
    </div>
  );
}
