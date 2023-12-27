import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  BaseDialogTitle,
} from "./BaseDialog";
import { NoteBodyEditor, NoteTitleEditor } from "../components/NoteEditor";
import PropTypes from "prop-types";
import { useEnhancedNavigate } from "../routes";
import { useNote } from "../api";

function NoteDetailsDialog({
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
            <AppButtonGroupSpacer />
            <AppButton>Keluar</AppButton>
          </AppButtonGroup>
        </BaseDialogFooter>
      </BaseDialogForm>
    </BaseDialog>
  );
}

NoteDetailsDialog.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  onBodyChanged: PropTypes.func.isRequired,
  onChangeArchive: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export function NoteNotFoundDialog({ onClose, onCreateNew }) {
  return (
    <BaseDialog open onCloseTransitionEnd={onClose}>
      <BaseDialogForm>
        <BaseDialogScrollable>
          <BaseDialogTitle>Catatan tidak ada!</BaseDialogTitle>
        </BaseDialogScrollable>
        <BaseDialogFooter>
          <AppButtonGroup>
            <AppButtonGroupSpacer />
            <AppButton>Keluar</AppButton>
            <AppButton
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                onCreateNew();
              }}
            >
              Buat Baru
            </AppButton>
          </AppButtonGroup>
        </BaseDialogFooter>
      </BaseDialogForm>
    </BaseDialog>
  );
}

NoteNotFoundDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func.isRequired,
};

export function NoteDetailsDialogWrapper() {
  const location = useLocation();
  const { id } = useParams();
  const { navigate, modalGoBack } = useEnhancedNavigate();
  const { note: rawNote, isLoading, archive, unarchive, remove } = useNote(id);

  const [note, setNote] = useState(rawNote);

  useEffect(() => {
    setNote(rawNote);
  }, [rawNote]);

  if (isLoading) return null;

  if (!note)
    return (
      <NoteNotFoundDialog
        onClose={modalGoBack}
        onCreateNew={() => {
          navigate(
            {
              pathname: "/note/add",
            },
            {
              state: location.state,
              replace: true,
            }
          );
        }}
      />
    );

  const { title, body, archived, createdAt } = note;
  return (
    <NoteDetailsDialog
      id={id}
      title={title}
      body={body}
      archived={archived}
      createdAt={createdAt}
      onClose={modalGoBack}
      onDelete={() => {
        remove();
      }}
      onChangeArchive={async (state) => {
        setNote({
          ...note,
          archived: state,
        });
        if (state) await archive();
        else unarchive();
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
