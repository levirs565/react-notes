import React from "react";
import { NoteList } from "./Note";
import { TopBar } from "./TopBar";

class App extends React.Component {
  constructor() {
    super();
    this.notes = [
      {
        id: 0,
        title: "Test",
        body: "Test Kontent",
        archived: false,
        createdAt: new Date().toString(),
      },
    ];
  }
  render() {
    return (
      <React.Fragment>
        <TopBar />
        <main>
          <NoteList list={this.notes} />
          <button className="app-fab">+</button>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
