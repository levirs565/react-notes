import React from "react";
import { NoteList } from "../components/Note";
import { useSyncSearchQuery } from "./utils";
import PropTypes from "prop-types";

class ArchiveNotePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main className="app-main">
        <NoteList
          list={this.props.notes.filter(({ archived }) => archived)}
          highlightPattern={this.props.searchQuery}
          emptyMessage={
            this.props.searchQuery.length > 0
              ? "Catatan terarsip tidak ditemukan"
              : "Arsip catatan kosong"
          }
        />
      </main>
    );
  }
}

ArchiveNotePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export function ArchiveNotePageWrapper({ onSearchQueryChanged, ...props }) {
  useSyncSearchQuery(props.searchQuery, onSearchQueryChanged);
  return <ArchiveNotePage {...props} />;
}

ArchiveNotePageWrapper.propTypes = {
  ...ArchiveNotePage.propTypes,
  onSearchQueryChanged: PropTypes.func.isRequired,
};
