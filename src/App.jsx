import { useState } from "react";
import "./App.css";
import BottomSheet from "./component/BottomSheet";

const bodyStyle = {
  width: "100%",
  height: "100%",
  border: "10px solid",
  backgroundColor: "rgba(7, 0, 0, 0.18)",
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handle_modal = (a) => {
    setIsModalOpen(a);
  };

  return (
    <div style={isModalOpen ? bodyStyle : {}}>
      <h3>
        React Bottom Sheet with Multiple Screen Snap Points and Spring Motion.
        With vanilla CSS
      </h3>
      <BottomSheet handle_modal={handle_modal} />
    </div>
  );
}

export default App;
