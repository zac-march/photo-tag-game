import style from "./Navbar.module.css";
import React from "react";
import uniqid from "uniqid";

function Navbar({ chars, foundChars }) {
  return (
    <div className={style.container}>
      <div className={style.charIcons}>
        {Object.keys(chars).map((char) => {
          return (
            <div
              key={uniqid()}
              className={
                foundChars.some((fChar) => fChar === char) ? style.found : ""
              }
            >
              <img alt={`${char}`} src={chars[char].imgURL} /> <h4>{char}</h4>
            </div>
          );
        })}
      </div>

      <h1 className={style.title}>Where's Waldo?</h1>

      <a target="_blank" href="./" className={style.buttonLink}>
        <h4>Leaderboard</h4>
      </a>
    </div>
  );
}

export default Navbar;
