import style from "./SelectedArea.module.css";
import React, { useState, useEffect } from "react";

function SelectedArea(props) {
  const { pos, selectSize, chars, handleCharSelect } = props;

  let btns = [];
  for (const char in chars) {
    btns.push(<button onClick={() => handleCharSelect(char)}>{char}</button>);
  }

  const areaBorder = (pos) => {
    return (
      <div
        className={style.areaBorder}
        style={{
          width: `${selectSize}px`,
          height: `${selectSize}px`,
          left: pos.x - selectSize / 2,
          top: pos.y - selectSize / 2,
        }}
      ></div>
    );
  };

  return (
    <div className={style.container}>
      {areaBorder(pos)}
      <div
        className={style.charButtons}
        style={{ left: pos.x + selectSize / 2, top: pos.y - selectSize / 2 }}
      >
        {btns}
      </div>
    </div>
  );
}

export default SelectedArea;
