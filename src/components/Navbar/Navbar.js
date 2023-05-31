import style from "./Navbar.module.css";
import React, { useState, useEffect } from "react";

function Navbar({ chars, foundChars }) {
  return (
    <div className={style.container}>
      <div className={style.charIcons}>
        {Object.keys(chars).map((char) => {
          return (
            <div
              className={
                foundChars.some((fChar) => fChar === char) ? style.found : ""
              }
            >
              <img alt={`${char}`} src={chars[char].img} /> <h4>{char}</h4>
            </div>
          );
        })}
      </div>
      <div>GITHUB</div>
    </div>
  );
}

export default Navbar;
