import style from "./SelectedArea.module.css";
import React from "react";
import uniqid from "uniqid";

function SelectedArea(props) {
  const { pos, selectSize, chars, handleCharSelect } = props;

  return (
    <div className={style.container}>
      <div
        className={style.areaBorder}
        style={{
          width: `${selectSize}px`,
          height: `${selectSize}px`,
          left: pos.x - selectSize / 2,
          top: pos.y - selectSize / 2,
        }}
      ></div>
      <div
        className={style.charButtons}
        style={{ left: pos.x + selectSize / 2, top: pos.y - selectSize / 2 }}
      >
        {Object.keys(chars).map((char) => {
          return (
            <button key={uniqid()} onClick={() => handleCharSelect(char)}>
              <img alt={`${char}`} src={chars[char].img} />
              {char}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectedArea;
