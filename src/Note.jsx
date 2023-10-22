import "./Note.css";

export function Note({ title, body, archived, createdAt, onDelete }) {
  return (
    <li className="note">
      <h3 className="note--title">{title}</h3>
      <time className="note--created-date">{createdAt}</time>
      <p className="note--body">{body}</p>
      <div className="note--buttons">
        <button className="button">
          {archived ? "Kembalikan" : "Arsipkan"}
        </button>
        <button onClick={onDelete} className="button button--danger">
          Hapus
        </button>
      </div>
    </li>
  );
}

export function NoteList({ list, onDeleteItem }) {
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
        />
      ))}
    </ul>
  );
}
