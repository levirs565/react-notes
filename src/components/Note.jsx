import { AppButton, AppButtonGroup } from "./AppButton";
import { HighlightText } from "./HighlightText";
import "./Note.css";
import { showFormattedDate } from "../utils";
import { Link, useLocation } from "react-router-dom";

export function Note({ id, title, body, createdAt, highlightPattern }) {
  const location = useLocation();
  return (
    <li className="note">
      <div className="note--header">
        <h3 className="note--title">
          <Link
            to={`/note/${id}`}
            state={{
              backgroundLocation: location,
            }}
            className="note--link"
          >
            <HighlightText text={title} pattern={highlightPattern} />
          </Link>
        </h3>
        <time className="note--created-date">
          {showFormattedDate(createdAt)}
        </time>
      </div>
      <p className="note--body">
        <HighlightText text={body} pattern={highlightPattern} />
      </p>
    </li>
  );
}

export function NoteList({ list, highlightPattern, emptyMessage }) {
  if (list.length === 0) {
    return <p className="note-empty">{emptyMessage}</p>;
  }
  return (
    <ul className="note-list">
      {list.map(({ id, title, body, createdAt }) => (
        <Note
          key={id}
          id={id}
          title={title}
          body={body}
          createdAt={createdAt}
          highlightPattern={highlightPattern}
        />
      ))}
    </ul>
  );
}
