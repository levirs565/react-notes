import { useEffect, useMemo } from "react";
import { NoteList } from "../components/Note";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useSearchQuery } from "./utils";
import { filterNotes } from "../utils";
import { useArchivedNotes } from "../api";

function ArchiveNotePage({ searchQuery }) {
  const { notes, isLoading } = useArchivedNotes();
  const filteredNotes = useMemo(
    () =>
      notes
        ? filterNotes(notes, searchQuery).filter(({ archived }) => archived)
        : [],
    [notes, searchQuery]
  );
  return (
    <main className="app-main">
      <NoteList
        list={filteredNotes}
        highlightPattern={searchQuery}
        emptyMessage={
          searchQuery.length > 0
            ? "Catatan terarsip tidak ditemukan"
            : "Arsip catatan kosong"
        }
        isLoading={isLoading}
      />
    </main>
  );
}

ArchiveNotePage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export function ArchiveNotePageWrapper() {
  const { setShowSearch } = useOutletContext();
  const [searchQuery] = useSearchQuery();

  useEffect(() => {
    setShowSearch(true);

    return () => {
      setShowSearch(false);
    };
  });

  return <ArchiveNotePage searchQuery={searchQuery} />;
}
