import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import "./NoteDetailsDialog.css";
import { AppButton, AppButtonGroup } from "../components/AppButton";

function NoteDetailsDialog({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onClose,
  onChangeArchive,
}) {
  const dialog = useRef();

  useEffect(() => {
    if (dialog.current) setTimeout(() => dialog.current.showModal(), 1);
  }, []);

  return (
    <dialog className="note-details-dialog" ref={dialog} onClose={onClose}>
      <form method="dialog">
        <div className="note-details-dialog--header">
          <h2 className="note-details-dialog--title">{title}</h2>
          <time className="note-details-dialog--created-date">
            {showFormattedDate(createdAt)}
          </time>
        </div>
        <p className="note-details-dialog--body">{body}</p>
        <AppButtonGroup>
          <AppButton
            onClick={(e) => {
              e.preventDefault();
              onChangeArchive(!archived);
            }}
          >
            {archived ? "Kembalikan" : "Arsipkan"}
          </AppButton>
          <AppButton onClick={onDelete} variant="danger">
            Hapus
          </AppButton>
        </AppButtonGroup>
      </form>
    </dialog>
  );
}

export function NoteDetailsDialogWrapper({
  notes,
  onNoteDelete,
  onNoteChangeArchive,
}) {
  const { id } = useParams();
  const [note, setNote] = useState(() => {
    return (
      notes.find((note) => note.id === Number(id)) ?? {
        title: "",
        body: "",
        archived: false,
        createdAt: Date.now(),
      }
    );
  });
  const { title, body, archived, createdAt } = note;
  const navigate = useNavigate();
  return (
    <NoteDetailsDialog
      id={id}
      title={title}
      body={body}
      archived={archived}
      createdAt={createdAt}
      onClose={() => {
        setTimeout(() => {
          navigate(-1);
        }, 250);
      }}
      onDelete={() => {
        onNoteDelete(id);
      }}
      onChangeArchive={(state) => {
        onNoteChangeArchive(id, state);
        setNote({
          ...note,
          archived: state,
        });
      }}
    />
  );
}
