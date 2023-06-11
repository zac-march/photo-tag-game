import style from "./Leaderboard.module.css";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import uniqid from "uniqid";

function Leaderboard({ db }) {
  const [leaderboard, setLeaderboard] = useState([]);

  async function fetchLeaderboard() {
    const q = query(collection(db, "Leaderboard"), orderBy("completionTime"));
    const querySnapshot = await getDocs(q);
    setLeaderboard(querySnapshot.docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header>
          <h1>Leaderboard</h1>
          <a href="./" className="buttonLink">
            <h4>Close</h4>
          </a>
        </header>
        <table className={style.leaderboard}>
          <tbody>
            {leaderboard &&
              leaderboard.map((entry) => (
                <tr key={uniqid()} className={style.entry}>
                  <td>
                    <h3>{entry.name}</h3>
                  </td>
                  <td className={style.score}>
                    <p>{entry.completionTime}s</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
