import React, { useState, useEffect } from "react";
import "./App.css";
import waldoImage from "./resources/whereiswaldo.jpg";
import debounce from "./utils/debounce";
import SelectedArea from "./components/AreaElement";

function App() {
  const [areaPos, setAreaPos] = useState();
  const [areaElement, setAreaElement] = useState();

  function handleImageClick(e) {
    const image = document.querySelector("#waldo");
    setAreaPos({
      x: e.pageX / image.offsetWidth,
      y: e.pageY / image.offsetHeight,
    });
  }

  function updateAreaElement() {
    const image = document.querySelector("#waldo");
    if (areaPos === undefined) return;
    const pos = {
      x: image.offsetWidth * areaPos.x,
      y: image.offsetHeight * areaPos.y,
    };
    setAreaElement(<SelectedArea pos={pos} />);
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(updateAreaElement, 10);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    updateAreaElement();
  }, [areaPos]);

  return (
    <div className="App">
      <div className="game">
        {areaElement && areaElement}
        <img
          id="waldo"
          alt="Where is waldo"
          onClick={handleImageClick}
          src={waldoImage}
        />
      </div>
    </div>
  );
}

export default App;
