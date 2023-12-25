import React, { useEffect, useMemo } from "react";
import { NoteList } from "../components/Note";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useSearchQuery } from "./utils";
import { filterNotes } from "../utils";

function ArchiveNotePage({ notes, searchQuery }) {
  const filteredNotes = useMemo(
    () => filterNotes(notes, searchQuery).filter(({ archived }) => archived),
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
      />
    </main>
  );
}

ArchiveNotePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export function ArchiveNotePageWrapper({ notes }) {
  const { setShowSearch } = useOutletContext();
  const [searchQuery] = useSearchQuery();

  useEffect(() => {
    setShowSearch(true);

    return () => {
      setShowSearch(false);
    };
  });

  return <ArchiveNotePage notes={notes} searchQuery={searchQuery} />;
}

ArchiveNotePageWrapper.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
