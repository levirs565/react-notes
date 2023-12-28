import { useEffect, useMemo } from "react";
import { NoteList } from "../components/Note";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useSearchQuery } from "./utils";
import { filterNotes } from "../utils";
import { useArchivedNotes } from "../api";
import { useI8n } from "../provider/context";

function ArchiveNotePage({ searchQuery }) {
  const { notes, isLoading } = useArchivedNotes();
  const filteredNotes = useMemo(
    () =>
      notes
        ? filterNotes(notes, searchQuery).filter(({ archived }) => archived)
        : [],
    [notes, searchQuery]
  );
  const { getText } = useI8n();

  return (
    <main className="app-main">
      <NoteList
        list={filteredNotes}
        highlightPattern={searchQuery}
        emptyMessage={getText(
          searchQuery.length > 0
            ? "archiveFindNotFoundMessage"
            : "archiveBlankMessage"
        )}
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
