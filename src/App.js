import React, { useState, useEffect } from "react";
import "./App.css";
import waldoImage from "./resources/whereiswaldo.jpg";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {
  const [areaPos, setAreaPos] = useState();
  const [areaElement, setAreaElement] = useState();

  function handleClick(e) {
    const image = document.querySelector("#waldo");
    setAreaPos({
      x: e.pageX / image.offsetWidth,
      y: e.pageY / image.offsetHeight,
    });
  }

  function updateAreaElement() {
    const image = document.querySelector("#waldo");
    if (areaPos === undefined) return;
    setAreaElement(
      areaBorder({
        x: image.offsetWidth * areaPos.x,
        y: image.offsetHeight * areaPos.y,
      })
    );
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(updateAreaElement, 10);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  useEffect(() => {
    updateAreaElement();
  }, [areaPos]);

  const areaBorder = (pos) => {
    const SIZE = 40;
    return (
      <div
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          position: "absolute",
          left: pos.x - SIZE / 2,
          top: pos.y - SIZE / 2,
          border: "black solid 3px",
        }}
      ></div>
    );
  };

  return (
    <div className="App">
      <div className="game">
        {areaElement && areaElement}
        <img
          id="waldo"
          alt="Where is waldo"
          onClick={handleClick}
          src={waldoImage}
        />
      </div>
    </div>
  );
}

export default App;
