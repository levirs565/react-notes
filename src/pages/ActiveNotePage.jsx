import { NoteList } from "../components/Note";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { useSyncSearchQuery } from "./utils";
import { useLocation } from "react-router-dom";

function ActiveNotePage({ location, notes, searchQuery }) {
  return (
    <main className="app-main">
      <NoteList
        list={notes.filter(({ archived }) => !archived)}
        highlightPattern={searchQuery}
        emptyMessage={
          searchQuery.length > 0 ? "Catatan tidak ditemukan" : "Catatan kosong"
        }
      />
      <FloatingActionButton
        to="/note/add"
        state={{
          backgroundLocation: location,
        }}
      >
        +
      </FloatingActionButton>
    </main>
  );
}

export function ActiveNotePageWrapper({ onSearchQueryChanged, ...props }) {
  const location = useLocation();
  useSyncSearchQuery(props.searchQuery, onSearchQueryChanged);

  return <ActiveNotePage location={location} {...props}></ActiveNotePage>;
}
