import { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";

const BottomSheet = ({ handle_modal }) => {
  const [position, setPosition] = useState("closed");
  const [isDragging, setIsDragging] = useState(false);
  const [change, setChange] = useState(false);
  let initialY = useRef(null);
  let delay = 0;
  let prev = 0;

  const handleSnap = (newPosition) => {
    if (newPosition == "half-open" || newPosition == "fully-open") {
      handle_modal(true);
    } else {
      handle_modal(false);
    }
    setPosition(newPosition);
  };

  const handleMouseDown = (e) => {
    setIsDragging(() => true);
    setChange(() => true);
    initialY.current = e.pageY || e.touches?.[0].pageY;
    prev = e.pageY || e.touches?.[0].pageY;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      delay = initialY.current - (e.pageY || e.touches?.[0].pageY);
      prev = e.pageY || e.touches?.[0].pageY;
    }
  };

  let handleMouseUp = (e) => {
    if (!change) return;
    if (delay == prev) return;
    if (delay >= 0 && position === "closed") {
      handleSnap("half-open");
      return;
    } else if (delay > 0 && position === "half-open") {
      handleSnap("fully-open");
      return;
    }
    if (delay < 0 && position == "fully-open") {
      handleSnap("half-open");
    } else if (delay < 0 && position == "half-open") {
      handleSnap("closed");
    }
    setChange(() => false);
  };

  useEffect(() => {
    function handleMouse(e) {
      handleMouseUp(e);
    }

    document.addEventListener("mouseup", handleMouse);

    return () => {
      setChange(() => !change);
      document.removeEventListener("mouseup", handleMouse);
    };
  }, [handleMouseUp]);

  return (
    <div
      className={`bottom-sheet ${position} uparrow`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      &#9650;
      <div className="content"></div>
      <div className="handle"></div>
      <div className="controls">
        <button onClick={() => handleSnap("closed")}>Close</button>
        <button onClick={() => handleSnap("half-open")}>Half</button>
        <button onClick={() => handleSnap("fully-open")}>Open</button>
      </div>
    </div>
  );
};

export default BottomSheet;
