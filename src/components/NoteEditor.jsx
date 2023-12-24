import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ContentEditable, LimitedContentEditable } from "./ContentEditable";
import PropTypes from "prop-types";
import "./NoteEditor.css";

export function NoteTitleEditor({ editable, value, onValueChanged }) {
  const [titleRemainingLength, setTitleRemainingLength] = useState();
  const maxTitleLength = 50;

  return (
    <div className="note-title-editor">
      <LimitedContentEditable
        as={"h2"}
        contentEditable={editable}
        className="note-title-editor--title"
        maxLength={maxTitleLength}
        placeholder="Judul"
        onRemainingLengthUpdated={(length) => setTitleRemainingLength(length)}
        value={value}
        onValueChanged={(e) => onValueChanged(e)}
      />
      <p
        className={`note-title-editor--remaining ${
          editable ? "note-title-editor--remaining--show" : ""
        }`}
      >
        {titleRemainingLength} tersisa
      </p>
    </div>
  );
}

NoteTitleEditor.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

export const NoteBodyEditor = forwardRef(function NoteBodyEditor(
  { editable, value, onValueChanged },
  ref
) {
  const elementRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus() {
        const range = document.createRange();
        range.selectNodeContents(elementRef.current);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        elementRef.current.focus();
      },
    };
  });
  return (
    <ContentEditable
      as={"div"}
      ref={elementRef}
      contentEditable={editable}
      className="note-body-editor"
      value={value}
      onValueChanged={(e) => onValueChanged(e)}
      placeholder="Catatan"
    />
  );
});

NoteBodyEditor.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};
