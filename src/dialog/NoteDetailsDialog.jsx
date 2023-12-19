import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import "./NoteDetailsDialog.css";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";

function NoteDetailsDialog({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onClose,
  onChangeArchive,
  onTitleChanged,
  onBodyChanged,
  onSave,
}) {
  const [editable, setEditable] = useState(false);
  const bodyRef = useRef();
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current) setTimeout(() => dialogRef.current.showModal(), 1);
  }, []);

  return (
    <dialog className="note-details-dialog" ref={dialogRef} onClose={onClose}>
      <form method="dialog">
        <div className="note-details-dialog--header">
          <h2
            contentEditable={editable}
            className="note-details-dialog--title"
            dangerouslySetInnerHTML={{ __html: title }}
            onBlur={(e) => onTitleChanged(e.target.innerHTML)}
          />
          <time className="note-details-dialog--created-date">
            {showFormattedDate(createdAt)}
          </time>
        </div>
        <div
          ref={bodyRef}
          contentEditable={editable}
          className="note-details-dialog--body"
          dangerouslySetInnerHTML={{ __html: body }}
          onBlur={(e) => onBodyChanged(e.target.innerHTML)}
        />
        <AppButtonGroup>
          {editable ? (
            <AppButton
              onClick={(e) => {
                e.preventDefault();
                setEditable(false);
                onSave();
              }}
            >
              Simpan
            </AppButton>
          ) : (
            <AppButton
              onClick={(e) => {
                e.preventDefault();
                setEditable(true);
                setTimeout(() => {
                  const range = document.createRange();
                  range.selectNodeContents(bodyRef.current);
                  range.collapse(false);
                  const selection = window.getSelection();
                  selection.removeAllRanges();
                  selection.addRange(range);
                  bodyRef.current.focus();
                }, 100);
              }}
            >
              Edit
            </AppButton>
          )}
          <AppButtonGroupSpacer />
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
  onNoteUpdate,
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
      onTitleChanged={(title) => {
        setNote({
          ...note,
          title,
        });
      }}
      onBodyChanged={(body) => {
        setNote({
          ...note,
          body,
        });
      }}
      onSave={() => {
        onNoteUpdate(note);
      }}
    />
  );
}
