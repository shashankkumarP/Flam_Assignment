
import  { useState } from "react";
import "./BottomSheet.css";

// eslint-disable-next-line react/prop-types
const BottomSheet = ({handle_modal}) => {
  const [position, setPosition] = useState("closed");

  const handleSnap = (newPosition) => {
    
    if(newPosition=="half-open" || newPosition=="fully-open"){
        handle_modal(true);
    }else{
        handle_modal(false);
    }
    setPosition(newPosition);
  };

  

  return (
    <div className={`bottom-sheet ${position}`}>
      {/* Content */}
      <div className="content">
        This is a Bottom sheet
      </div>

      {/* Handle */}
      <div className="handle" onMouseDown={() => handleSnap("half-open")}>
        Drag me
      </div>

      {/* Buttons for manual control */}
      <div className="controls">
        <button onClick={() => handleSnap("closed")}>Close</button>
        <button onClick={() => handleSnap("half-open")}>Half</button>
        <button onClick={() => handleSnap("fully-open")}>Open</button>
      </div>
    </div>
  );
};

export default BottomSheet;



