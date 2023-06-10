import React, { useState, useEffect } from "react";
import "./App.css";
import waldoBgImage from "./resources/whereiswaldo.jpg";
import SelectedArea from "./components/SelectedArea/SelectedArea";
import Navbar from "./components/Navbar/Navbar";
import Timer from "./utils/Timer";
import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./utils/getFirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import SubmitScore from "./components/SubmitScore/SubmitScore";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

const SELECT_SIZE = 40;

const timer = new Timer();

function App() {
  const [selectedAreaEl, setSelectedAreaEl] = useState();
  const [clickedChar, setClickedChar] = useState();
  const [selectedChar, setSelectedChar] = useState();
  const [foundChars, setFoundChars] = useState([]);
  const [chars, setChars] = useState();
  const [isGameOver, setIsGameOver] = useState(false);

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
    timer.start();
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
    if (!selectedChar) return;
    if (
      selectedChar === clickedChar &&
      !foundChars.some((fChar) => fChar === selectedChar)
    ) {
      setFoundChars((prev) => [...prev, selectedChar]);
    }
    setSelectedAreaEl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChar]);

  useEffect(() => {
    if (!chars) return;
    let hasFoundAllChars = Object.keys(chars)
      .map((char) => foundChars.some((fChar) => char === fChar))
      .every((val) => val === true);
    console.log(hasFoundAllChars);

    if (hasFoundAllChars) {
      timer.stop();
      console.log(timer.getTime());
      setIsGameOver(true);
    }
  }, [foundChars]);

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
          {isGameOver && <SubmitScore time={timer.getTime()} db={db} />}
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
