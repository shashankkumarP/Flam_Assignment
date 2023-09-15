import  { useState,useRef, useEffect,useCallback } from "react";
import "./BottomSheet.css";

const BottomSheet = ({handle_modal}) => {
  const [position, setPosition] = useState("closed");
  const [isDragging, setIsDragging] = useState(false);
 let initialY = useRef(null);
 let delay=0;
 
  const handleSnap = (newPosition) => {
    
    if(newPosition=="half-open" || newPosition=="fully-open"){
        handle_modal(true);
    }else{
        handle_modal(false);
    }
    setPosition(newPosition);
  };
  

   const handleMouseDown = (e) => {
             setIsDragging(true);
            initialY.current=e.pageY || e.touches?.[0].pageY;
            
  };



  const handleMouseMove = (e) => {
    console.log(e.clientY,initialY.current)
    if (isDragging ) {
    
      delay =  initialY.current  - (e.pageY || e.touches?.[0].pageY);
      console.log(delay,'mousemove');
    }
  };

  const handleMouseUp = () => {
    console.log(delay,"up")
    if (delay>=0 && position === "closed") {
        handleSnap("half-open");
        return;
      } else if (delay >0 && position === "half-open") {
        handleSnap("fully-open");
        return;
      }
      if(delay<0 && position=="fully-open"){
        handleSnap("half-open")
      }else if(delay<0 && position=="half-open"){
        handleSnap("closed")
      }
      
  }

  useEffect(()=>{

    function handleMouseup(e){
        // onGlobalMouseUp(e)
        delay =  initialY.current  - (e.pageY || e.touches?.[0].pageY);
        console.log('Mouse up event occurred:', e);
        console.log(position)
        if (delay>=0 && position === "closed") {
            handleSnap("half-open");
            return;
          } else if (delay >0 && position === "half-open") {
            handleSnap("fully-open");
            return;
          }
          if(delay<0 && position=="fully-open"){
            handleSnap("half-open")
          }else if(delay<0 && position=="half-open"){
            handleSnap("closed")
          }
    }
    document.addEventListener('mouseup', handleMouseup);
    return () => {
        document.removeEventListener('mouseup', handleMouseup);
      };

  },[position])


  return (
    <div className={`bottom-sheet ${position} uparrow`}  onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    // onMouseUp={()=>handleMouseUp()} 
     >
      &#9650;
      <div className="content">
      </div>

      
      <div className="handle" 
       >
        Drag me upward and downward around this region
      </div>
      <div className="controls">
        <button onClick={() => handleSnap("closed")}>Close</button>
        <button onClick={() => handleSnap("half-open")}>Half</button>
        <button onClick={() => handleSnap("fully-open")}>Open</button>
      </div>
    </div>
  );
};

export default BottomSheet;
