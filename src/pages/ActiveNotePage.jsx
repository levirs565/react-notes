import React from "react";
import { NoteList } from "../components/Note";
import { AddNoteDialog } from "../dialog/AddNoteDialog";
import { FloatingActionButton } from "../components/FloatingActionButton";

export class ActiveNotePage extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddDialogOpen: false,
    };

    this.onAddFabClickHandler = () => {
      this.setState({
        ...this.state,
        isAddDialogOpen: true,
      });
    };
    this.onDialogChangeHandler = (state) => {
      this.setState({
        ...this.state,
        isAddDialogOpen: state,
      });
    };
  }

  render() {
    return (
      <main className="app-main">
        <NoteList
          list={this.props.notes.filter(({ archived }) => !archived)}
          highlightPattern={this.props.searchQuery}
          onItemDelete={this.props.onNoteDelete}
          onItemChangeArchive={this.props.onNoteChangeArchive}
          emptyMessage={
            this.props.searchQuery.length > 0
              ? "Catatan tidak ditemukan"
              : "Catatan kosong"
          }
        />
        <FloatingActionButton onClick={this.onAddFabClickHandler}>
          +
        </FloatingActionButton>
        <AddNoteDialog
          open={this.state.isAddDialogOpen}
          onChange={this.onDialogChangeHandler}
          onSubmit={this.props.onNoteAdd}
        />
      </main>
    );
  }
}
