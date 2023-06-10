import React, { useState, useEffect } from "react";
import "./App.css";
import waldoBgImage from "./resources/whereiswaldo.jpg";
import SelectedArea from "./components/SelectedArea/SelectedArea";
import Navbar from "./components/Navbar/Navbar";
import odlawImage from "./resources/odlaw.jpg";
import waldoImage from "./resources/waldo.jpg";
import wizardImage from "./resources/wizard.jpeg";
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./utils/getFirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

const SELECT_SIZE = 40;

function App() {
  const [selectedAreaEl, setSelectedAreaEl] = useState();
  const [clickedChar, setClickedChar] = useState();
  const [selectedChar, setSelectedChar] = useState();
  const [foundChars, setFoundChars] = useState([]);
  const [chars, setChars] = useState();

  async function getCharData() {
    const tempChars = {};
    const querySnapshot = await getDocs(collection(db, "Characters"));
    querySnapshot.forEach((doc) => {
      tempChars[doc.id] = doc.data();
    });
    setChars(tempChars);
  }

  useEffect(() => {
    getCharData();
  }, []);

  function handleImageClick(e) {
    const selectPos = { x: e.pageX, y: e.pageY };
    setClickedChar(getClickedChar(selectPos));
    setSelectedAreaEl(
      <SelectedArea
        pos={selectPos}
        selectSize={SELECT_SIZE}
        chars={chars}
        handleCharSelect={(char) => setSelectedChar(char)}
      />
    );
  }
  useEffect(() => {
    if (
      selectedChar === clickedChar &&
      !foundChars.some((fChar) => fChar === selectedChar)
    ) {
      setFoundChars((prev) => [...prev, selectedChar]);
    }
    setSelectedAreaEl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChar]);

  function getClickedChar(selectPos) {
    const image = document.querySelector("#waldoImage");
    for (const char in chars) {
      const cPos = {
        x: chars[char].x * image.offsetWidth + image.offsetLeft,
        y: chars[char].y * image.offsetHeight + image.offsetTop,
      };
      if (
        selectPos.x >= cPos.x - SELECT_SIZE &&
        selectPos.x <= cPos.x + SELECT_SIZE &&
        selectPos.y >= cPos.y - SELECT_SIZE &&
        selectPos.y <= cPos.y + SELECT_SIZE
      ) {
        return char;
      }
    }
    return null;
  }

  return (
    <div className="App">
      {chars && (
        <>
          <Navbar chars={chars} foundChars={foundChars} />
          <div className="game">
            {selectedAreaEl && selectedAreaEl}
            <img
              id="waldoImage"
              alt="Where is waldo"
              onClick={handleImageClick}
              src={waldoBgImage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
