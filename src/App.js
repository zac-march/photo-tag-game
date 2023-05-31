import React, { useState, useEffect } from "react";
import "./App.css";
import waldoBgImage from "./resources/whereiswaldo.jpg";
import debounce from "./utils/debounce";
import SelectedArea from "./components/SelectedArea/SelectedArea";
import Navbar from "./components/Navbar/Navbar";
import odlawImage from "./resources/odlaw.jpg";
import waldoImage from "./resources/waldo.jpg";
import wizardImage from "./resources/wizard.jpeg";

const CHARS = {
  WIZARD: { x: 0.6142292490118577, y: 0.8609355246523388, img: wizardImage },
  ODLAW: {
    x: 0.6015810276679842,
    y: 0.640960809102402,
    img: odlawImage,
  },
  WALDO: {
    x: 0.27735368956743,
    y: 0.32926829268292684,
    img: waldoImage,
  },
};

const SELECT_SIZE = 40;

function App() {
  const [areaPos, setAreaPos] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [selectedChar, setSelectedChar] = useState();
  const [foundChars, setFoundChars] = useState([]);

  function handleImageClick(e) {
    const image = document.querySelector("#waldo");
    setAreaPos({
      x: e.pageX / image.offsetWidth,
      y: e.pageY / image.offsetHeight,
    });

    setSelectedChar(
      getClickedChar(
        { x: e.pageX - image.x, y: e.pageY - image.y },
        image.offsetWidth,
        image.offsetHeight
      )
    );
  }

  function handleCharSelect(char) {
    if (char === selectedChar && !foundChars.some((fChar) => fChar === char)) {
      setFoundChars((prev) => [...prev, char]);
      console.log("You found" + char);
    }
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
    console.log("foundChars:", foundChars);
  }, [foundChars]);

  useEffect(() => {
    updateAreaElement();
  }, [areaPos]);

  useEffect(() => {
    console.log(selectedChar);
  }, [selectedChar]);

  return (
    <div className="App">
      <Navbar chars={CHARS} foundChars={foundChars} />
      <div className="game">
        {selectedArea && selectedArea}
        <img
          id="waldo"
          alt="Where is waldo"
          onClick={handleImageClick}
          src={waldoBgImage}
        />
      </div>
    </div>
  );
}

export default App;
