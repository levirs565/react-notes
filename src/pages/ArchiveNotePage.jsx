import React from "react";
import { NoteList } from "../components/Note";

export class ArchiveNotePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main className="app-main">
        <NoteList
          list={this.props.notes.filter(({ archived }) => archived)}
          highlightPattern={this.props.searchQuery}
          onItemDelete={this.props.onNoteDelete}
          onItemChangeArchive={this.props.onNoteChangeArchive}
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
