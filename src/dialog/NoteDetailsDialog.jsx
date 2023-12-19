import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import "./NoteDetailsDialog.css";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
} from "../components/AppButton";
import {
  BaseDialog,
  BaseDialogScrollable,
  BaseDialogFooter,
  BaseDialogForm,
} from "./BaseDialog";
import { NoteBodyEditor, NoteTitleEditor } from "../components/NoteEditor";

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

  return (
    <BaseDialog
      open
      className="note-details-dialog"
      onCloseTransitionEnd={onClose}
    >
      <BaseDialogForm>
        <BaseDialogScrollable>
          <NoteTitleEditor
            editable={editable}
            value={title}
            onValueChanged={(newTitle) => onTitleChanged(newTitle)}
          />
          <time className="note-details-dialog--created-date">
            {showFormattedDate(createdAt)}
          </time>
          <NoteBodyEditor
            ref={bodyRef}
            editable={editable}
            value={body}
            onValueChanged={(newBody) => onBodyChanged(newBody)}
          />
        </BaseDialogScrollable>
        <BaseDialogFooter>
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
        </BaseDialogFooter>
      </BaseDialogForm>
    </BaseDialog>
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
        navigate(-1);
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
