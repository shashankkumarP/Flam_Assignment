import { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";

const BottomSheet = ({ handle_modal }) => {
  const [position, setPosition] = useState("closed");
  const [isDragging, setIsDragging] = useState(false);
  const [change, setChange] = useState(false);
  let initialY = useRef(null);
  let delay = 0;
  let prev = 0;
  let opening;
  let closing;

  const handleSnap = (newPosition) => {
    if (newPosition != "closed") {
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
      handleSnap("semi-half-open");
      
    } else if (delay > 0 && position === "semi-half-open") {
      handleSnap("half-open");
      
    }else if(delay > 0 && position === "half-open"){
        handleSnap("semi-fully-open");
        
    }else if(delay > 0 && position === "semi-fully-open"){
        handleSnap("fully-open");
    }
    else if (delay < 0 && position == "fully-open") {
      handleSnap("semi-fully-open");
    } else if (delay < 0 && position == "semi-fully-open") {
      handleSnap("half-open");
    }else if (delay < 0 && position == "half-open") {
        handleSnap("semi-half-open");
    }else if (delay < 0 && position == "semi-half-open") {
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
  
  console.log(opening,closing)
  return (
    <div
      className={`bottom-sheet ${position} uparrow`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      &#9650;
      <div className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, animi consequatur facilis ullam inventore repellendus ipsa laboriosam perspiciatis, pariatur nesciunt nobis qui. Dolore laboriosam mollitia dolorum saepe dolor iure.</div>
      <div className="handle"></div>
      <div className="controls"  >
        <button style={{marginRight:"5px"}} onClick={() => handleSnap("fully-open")}>Fully open</button>
        <button onClick={() => handleSnap("closed")}>Fully close</button>
      </div>
    </div>
  );
};

export default BottomSheet;
