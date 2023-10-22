import { AppButton, AppButtonGroup } from "./AppButton";
import { HighlightText } from "./HighlightText";
import "./Note.css";
import { showFormattedDate } from "../utils";

export function Note({
  title,
  body,
  archived,
  createdAt,
  highlightPattern,
  onDelete,
  onChangeArchive,
}) {
  return (
    <li className="note">
      <div className="note--header">
        <h3 className="note--title">
          <HighlightText text={title} pattern={highlightPattern} />
        </h3>
        <time className="note--created-date">
          {showFormattedDate(createdAt)}
        </time>
      </div>
      <p className="note--body">
        <HighlightText text={body} pattern={highlightPattern} />
      </p>
      <AppButtonGroup>
        <AppButton onClick={() => onChangeArchive(!archived)}>
          {archived ? "Kembalikan" : "Arsipkan"}
        </AppButton>
        <AppButton onClick={onDelete} variant="danger">
          Hapus
        </AppButton>
      </AppButtonGroup>
    </li>
  );
}

export function NoteList({
  list,
  highlightPattern,
  onItemDelete,
  onItemChangeArchive,
  emptyMessage,
}) {
  if (list.length === 0) {
    return <p className="note-empty">{emptyMessage}</p>;
  }
  return (
    <ul className="note-list">
      {list.map(({ id, title, body, archived, createdAt }) => (
        <Note
          key={id}
          title={title}
          body={body}
          archived={archived}
          createdAt={createdAt}
          highlightPattern={highlightPattern}
          onDelete={() => onItemDelete(id)}
          onChangeArchive={(archived) => onItemChangeArchive(id, archived)}
        />
      ))}
    </ul>
  );
}
