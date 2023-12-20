import { useEffect, useRef, useState } from "react";
import "./Masonry.css";

function isDivider(node) {
  return node.className === "masonry--divider";
}

export function Masonry({ as, className, children }) {
  const As = as;
  const elementRef = useRef();

  const [maxColumnHeight, setMaxColumnHeight] = useState();
  const [lineBreakCount, setLineBreakCount] = useState(0);

  const updateSize = () => {
    const element = elementRef.current;

    const columnCount = parseInt(
      window.getComputedStyle(element).getPropertyValue("--column-count")
    );
    const columnsHeight = new Array(columnCount).fill(0);
    let skip = false;
    element.childNodes.forEach((child) => {
      if (skip) return;

      if (isDivider(child)) {
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
    const requestUpdateSize = () => {
      animationFrame = requestAnimationFrame(updateSize);
    };
    const resizeObserver = new ResizeObserver(() => {
      requestUpdateSize();
    });
    const mutationObserver = new MutationObserver((mutationList) => {
      let resetMaxHeight = false;
      let requestUpdate = false;
      mutationList.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (isDivider(node)) {
            return;
          }
          resizeObserver.observe(node);
          resetMaxHeight = true;
        });
        mutation.removedNodes.forEach((node) => {
          if (isDivider(node)) {
            return;
          }
          resizeObserver.unobserve(node);
          requestUpdate = true;
        });
      });

      if (resetMaxHeight) setMaxColumnHeight(null);
      if (requestUpdate) requestUpdateSize();
    });

    elementRef.current.childNodes.forEach((node) =>
      resizeObserver.observe(node)
    );
    mutationObserver.observe(elementRef.current, {
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
      <span key={index} className="masonry--divider" style={{ order: index }} />
    ));

  return (
    <As
      className={["masonry", className].join(" ")}
      ref={elementRef}
      style={{
        height: maxColumnHeight,
      }}
    >
      {children}
      {dividerList}
    </As>
  );
}

export function MasonryItem({ as, className, children }) {
  const As = as;
  return <As className={["masonry--item", className].join(" ")}>{children}</As>;
}
