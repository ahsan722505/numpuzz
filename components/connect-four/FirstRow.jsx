import React from "react";
import { useSelector } from "react-redux";
import styles from "./FirstRow.module.scss";
const FirstRow = ({ currentPlayer }) => {
  const { isLoggedIn, username } = useSelector((state) => state.global);
  const { opponent, self, waitingForOpponent } = useSelector(
    (state) => state.connectFour
  );
  console.log(opponent);
  return (
    <div className={styles.row}>
      <h1 style={{ backgroundColor: currentPlayer === self?.id && "white" }}>
        {username}
      </h1>
      <h1>
        {self?.wins || 0} - {opponent?.wins || 0}
      </h1>
      <h1
        style={{
          backgroundColor: currentPlayer === opponent?.id && "white",
        }}
      >
        {waitingForOpponent ? "waiting for player" : opponent?.username}
      </h1>
    </div>
  );
};

export default FirstRow;
