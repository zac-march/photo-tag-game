import style from "./SubmitScore.module.css";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function SubmitScore({ time, db }) {
  const [nameValue, setNameValue] = useState("");

  async function handleSubmit() {
    if (!nameValue) return;
    await addDoc(collection(db, "Leaderboard"), {
      name: nameValue,
      completionTime: time,
    });
    window.location.reload();
  }

  function handleInputChange(e) {
    setNameValue(e.target.value);
  }

  return (
    <div className={style.container}>
      <div class={style.wrapper}>
        <h2>You finished in {time} seconds!</h2>
        <p>Enter your name and submit your score to the leaderboard!</p>
        <form className={style.form}>
          <input value={nameValue} onChange={handleInputChange} />
          <button onClick={handleSubmit} type="button" className="buttonLink">
            <h5>Submit</h5>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitScore;
