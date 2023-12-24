import { HighlightHTML } from "./HighlightHTML";
import "./Note.css";
import { showFormattedDate } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { Masonry, MasonryItem } from "./Masonry";
import PropTypes from "prop-types";

export function Note({ id, title, body, createdAt, highlightPattern }) {
  const location = useLocation();
  return (
    <MasonryItem as="li" className="note">
      <div className="note--header">
        <h3 className="note--title">
          <Link
            to={`/note/${id}`}
            state={{
              backgroundLocation: location,
            }}
            className="note--link"
          >
            <HighlightHTML text={title} pattern={highlightPattern} />
          </Link>
        </h3>
        <time className="note--created-date">
          {showFormattedDate(createdAt)}
        </time>
      </div>
      <div className="note--body">
        <HighlightHTML text={body} pattern={highlightPattern} />
      </div>
    </MasonryItem>
  );
}

Note.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  highlightPattern: PropTypes.string.isRequired,
};

export function NoteList({ list, highlightPattern, emptyMessage }) {
  if (list.length === 0) {
    return <p className="note-empty">{emptyMessage}</p>;
  }

  return (
    <Masonry as="ul" className="note-list">
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
    </Masonry>
  );
}

NoteList.propTypes = {
  list: PropTypes.array.isRequired,
  highlightPattern: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
};
