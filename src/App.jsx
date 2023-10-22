import React from "react";
import { NoteList } from "./Note";
import { TopBar } from "./TopBar";
import AddNoteDialog from "./AddNoteDialog";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddDialogOpen: false,
      notes: [
        this.createNote({
          title: "Test",
          body: "Test Kontent",
        }),
      ],
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
    this.onDialogSubmitHandler = (data) => {
      this.setState({
        ...this.state,
        notes: [...this.state.notes, this.createNote(data)],
      });
    };
  }

  createNote(data) {
    const date = new Date();
    return {
      ...data,
      id: +date,
      archived: false,
      createdAt: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    };
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <main>
          <NoteList list={this.state.notes} />
          <button className="app-fab" onClick={this.onAddFabClickHandler}>
            +
          </button>
          <AddNoteDialog
            open={this.state.isAddDialogOpen}
            onChange={this.onDialogChangeHandler}
            onSubmit={this.onDialogSubmitHandler}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
