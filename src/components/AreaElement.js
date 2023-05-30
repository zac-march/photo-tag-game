import style from "./AreaElement.module.css";
import React, { useState, useEffect } from "react";

function SelectedArea(props) {
  const { pos } = props;

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

  return <div className={style.container}>{areaBorder(pos)}</div>;
}

export default SelectedArea;
