import { AppButton, AppButtonGroup } from "./AppButton";
import "./Note.css";

export function Note({
  title,
  body,
  archived,
  createdAt,
  onDelete,
  onChangeArchive,
}) {
  return (
    <li className="note">
      <h3 className="note--title">{title}</h3>
      <time className="note--created-date">{createdAt}</time>
      <p className="note--body">{body}</p>
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
  onDeleteItem,
  onChangeItemArchive,
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
          onDelete={() => onDeleteItem(id)}
          onChangeArchive={(archived) => onChangeItemArchive(id, archived)}
        />
      ))}
    </ul>
  );
}
