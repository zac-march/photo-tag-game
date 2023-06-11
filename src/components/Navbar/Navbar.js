import style from "./Navbar.module.css";
import React from "react";
import uniqid from "uniqid";

function Navbar({ chars, foundChars, setShowLeaderboard }) {
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

      <button onClick={() => setShowLeaderboard(true)} className="buttonLink">
        <h4>Leaderboard</h4>
      </button>
    </div>
  );
}

export default Navbar;
