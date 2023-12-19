import { useState } from "react";
import "./NoteAddDialog.css";
import { AppButton, AppButtonGroup } from "../components/AppButton";
import { useNavigate } from "react-router-dom";
import {
  BaseDialog,
  BaseDialogFooter,
  BaseDialogForm,
  BaseDialogScrollable,
} from "./BaseDialog";
import { NoteBodyEditor, NoteTitleEditor } from "../components/NoteEditor";

function NoteAddDialog({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <BaseDialog
      className={"note-add-dialog"}
      open
      onCloseTransitionEnd={() => onClose()}
    >
      <BaseDialogForm>
        <BaseDialogScrollable>
          <NoteTitleEditor
            editable
            value={title}
            onValueChanged={(newTitle) => setTitle(newTitle)}
          />
          <NoteBodyEditor
            editable
            value={body}
            onValueChanged={(newBody) => setBody(newBody)}
          />
        </BaseDialogScrollable>
        <BaseDialogFooter>
          <AppButtonGroup>
            <AppButton
              disabled={title.length === 0}
              variant="primary"
              onClick={() =>
                onSubmit({
                  title,
                  body,
                })
              }
            >
              Simpan
            </AppButton>
          </AppButtonGroup>
        </BaseDialogFooter>
      </BaseDialogForm>
    </BaseDialog>
  );
}

export function NoteAddDialogWrapper({ onSubmit }) {
  const navigate = useNavigate();
  return <NoteAddDialog onClose={() => navigate(-1)} onSubmit={onSubmit} />;
}
