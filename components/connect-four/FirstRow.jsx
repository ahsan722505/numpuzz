import React from "react";
import { useSelector } from "react-redux";
import styles from "./FirstRow.module.scss";
const FirstRow = ({ currentPlayer }) => {
  const { isLoggedIn, username } = useSelector((state) => state.global);
  const { opponent, self } = useSelector((state) => state.connectFour);
  console.log(opponent);
  return (
    <div className={styles.row}>
      <h1
        style={{ backgroundColor: currentPlayer === self?.playId && "white" }}
      >
        {isLoggedIn ? username : "numpuzz user"}
      </h1>
      <h1
        style={{
          backgroundColor: currentPlayer === opponent?.playId && "white",
        }}
      >
        {(opponent && opponent.username) || "waiting for player"}
      </h1>
    </div>
  );
};

export default FirstRow;
