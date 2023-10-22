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
        {
          id: 0,
          title: "Test",
          body: "Test Kontent",
          archived: false,
          createdAt: new Date().toString(),
        },
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
        notes: [
          ...this.state.notes,
          {
            ...data,
            id: +new Date(),
            archived: false,
            createdAt: new Date().toString(),
          },
        ],
      });
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
