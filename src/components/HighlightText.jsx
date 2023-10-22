import React from "react";
import "./HighlightText.css";

export function HighlightText({ text, pattern }) {
  if (pattern.length === 0)
    return [<React.Fragment key={0}>{text}</React.Fragment>];
  const lowerCased = text.toLowerCase();
  const result = [];
  let lastIndex = 0;
  let currentIndex = 0;
  let keyIndex = 0;
  while (
    ((currentIndex = lowerCased.indexOf(pattern, lastIndex)), currentIndex >= 0)
  ) {
    result.push(
      <React.Fragment key={keyIndex}>
        {text.substring(lastIndex, currentIndex)}
      </React.Fragment>
    );
    keyIndex++;
    const endIndex = currentIndex + pattern.length;
    result.push(
      <span className="highlight-text" key={keyIndex}>
        {text.substring(currentIndex, endIndex)}
      </span>
    );
    keyIndex++;
    lastIndex = endIndex;
  }
  if (lastIndex < text.length) {
    result.push(
      <React.Fragment key={keyIndex}>
        {text.substring(lastIndex)}
      </React.Fragment>
    );
  }
  return result;
}
