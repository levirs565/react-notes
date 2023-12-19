import { AppButton, AppButtonGroup } from "./AppButton";
import { HighlightText } from "./HighlightText";
import "./Note.css";
import { showFormattedDate } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function Note({ id, title, body, createdAt, highlightPattern }) {
  const location = useLocation();
  return (
    <li className="note">
      <div className="note--header">
        <h3 className="note--title">
          <Link
            to={`/note/${id}`}
            state={{
              backgroundLocation: location,
            }}
            className="note--link"
          >
            <HighlightText text={title} pattern={highlightPattern} />
          </Link>
        </h3>
        <time className="note--created-date">
          {showFormattedDate(createdAt)}
        </time>
      </div>
      <p className="note--body">
        <HighlightText text={body} pattern={highlightPattern} />
      </p>
    </li>
  );
}

export function NoteListGrid({ list, highlightPattern }) {
  const listRef = useRef();

  const columnCount = 4;
  const [maxColumnHeight, setMaxColumnHeight] = useState();
  const [lineBreakCount, setLineBreakCount] = useState(0);

  const updateSize = () => {
    const listElement = listRef.current;

    const columnsHeight = new Array(columnCount).fill(0);
    let skip = false;
    listElement.childNodes.forEach((child) => {
      if (skip) return;

      if (child.className === "masonry-divider") {
        return;
      }

      const computedStyle = window.getComputedStyle(child);
      const height = parseInt(computedStyle.height);
      if (height === 0) {
        skip = true;
        return;
      }

      const totalHeight = height + parseInt(computedStyle.marginBottom);

      const minHeightIndex = columnsHeight.indexOf(Math.min(...columnsHeight));
      columnsHeight[minHeightIndex] += totalHeight;
      child.style.order = minHeightIndex;
    });

    if (!skip) {
      setMaxColumnHeight(Math.max(...columnsHeight));
      setLineBreakCount(columnCount - 1);
    }
  };

  useEffect(() => {
    let animationFrame;
    const resizeObserver = new ResizeObserver(() => {
      animationFrame = requestAnimationFrame(updateSize);
    });
    const mutationObserver = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.className === "masonry-divider") {
            return;
          }
          resizeObserver.observe(node);
        });
        mutation.removedNodes.forEach((node) => {
          if (node.className === "masonry-divider") {
            return;
          }
          resizeObserver.unobserve(node);
        });
      });
    });

    listRef.current.childNodes.forEach((node) => resizeObserver.observe(node));
    mutationObserver.observe(listRef.current, {
      childList: true,
    });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const dividerList = new Array(lineBreakCount)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        className="masonry-divider"
        style={{ order: index + 1 }}
      ></span>
    ));

  return (
    <ul
      className="note-list"
      ref={listRef}
      style={{
        height: maxColumnHeight,
      }}
    >
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
      {dividerList}
    </ul>
  );
}

export function NoteList({ list, highlightPattern, emptyMessage }) {
  if (list.length === 0) {
    return <p className="note-empty">{emptyMessage}</p>;
  }

  return <NoteListGrid list={list} highlightPattern={highlightPattern} />;
}
