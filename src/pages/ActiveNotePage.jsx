import { NoteList } from "../components/Note";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { useLocation, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { useSearchQuery } from "./utils";
import { filterNotes } from "../utils";
import { useActiveNotes } from "../api";

function ActiveNotePage({ location, searchQuery }) {
  const { notes } = useActiveNotes();
  const filteredNotes = useMemo(
    () =>
      notes
        ? filterNotes(notes, searchQuery).filter(({ archived }) => !archived)
        : [],
    [searchQuery, notes]
  );
  return (
    <main className="app-main">
      <NoteList
        list={filteredNotes}
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

ActiveNotePage.propTypes = {
  location: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export function ActiveNotePageWrapper() {
  const { setShowSearch } = useOutletContext();
  const [searchQuery] = useSearchQuery();
  const location = useLocation();

  useEffect(() => {
    setShowSearch(true);

    return () => {
      setShowSearch(false);
    };
  });

  return <ActiveNotePage location={location} searchQuery={searchQuery} />;
}
