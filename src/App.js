import React, { useState, useEffect } from "react";
import "./App.css";
import waldoImage from "./resources/whereiswaldo.jpg";
import debounce from "./utils/debounce";
import SelectedArea from "./components/SelectedArea";

const CHARS = {
  WIZARD: { x: 0.6142292490118577, y: 0.8609355246523388 },
  ODLAW: {
    x: 0.6015810276679842,
    y: 0.640960809102402,
  },
  WALDO: {
    x: 0.27735368956743,
    y: 0.32926829268292684,
  },
};

const SELECT_SIZE = 40;

function App() {
  const [areaPos, setAreaPos] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedChar, setSelectedChar] = useState();

  function handleImageClick(e) {
    const image = document.querySelector("#waldo");
    setAreaPos({
      x: e.pageX / image.offsetWidth,
      y: e.pageY / image.offsetHeight,
    });

    setSelectedChar(
      getClickedChar(
        { x: e.pageX, y: e.pageY },
        image.offsetWidth,
        image.offsetHeight
      )
    );
  }

  function handleCharSelect(char) {
    if (char === selectedChar) console.log("You found" + char);
    setSelectedArea();
  }

  function updateAreaElement() {
    if (areaPos === undefined) return;
    const image = document.querySelector("#waldo");
    const imgWidth = image.offsetWidth;
    const imgHeight = image.offsetHeight;
    const imgPos = {
      x: imgWidth * areaPos.x,
      y: imgHeight * areaPos.y,
    };
    setSelectedArea(
      <SelectedArea
        pos={imgPos}
        selectSize={SELECT_SIZE}
        chars={CHARS}
        handleCharSelect={handleCharSelect}
      />
    );
  }

  function getClickedChar(imgPos, imgWidth, imgHeight) {
    for (const char in CHARS) {
      const cPos = {
        x: CHARS[char].x * imgWidth,
        y: CHARS[char].y * imgHeight,
      };
      if (
        imgPos.x >= cPos.x - SELECT_SIZE &&
        imgPos.x <= cPos.x + SELECT_SIZE &&
        imgPos.y >= cPos.y - SELECT_SIZE &&
        imgPos.y <= cPos.y + SELECT_SIZE
      ) {
        return char;
      }
    }
    return null;
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

  useEffect(() => {
    console.log(selectedChar);
  }, [selectedChar]);

  return (
    <div className="App">
      <div className="game">
        {selectedArea && selectedArea}
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
