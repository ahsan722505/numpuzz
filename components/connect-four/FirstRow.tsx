import React from "react";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
import styles from "./FirstRow.module.scss";
const FirstRow = ({ currentPlayer }: { currentPlayer: 1 | 2 }) => {
  const username = useGlobalStore((state) => state.username);
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const waitingForOpponent = useConnectFourStore(
    (state) => state.waitingForOpponent
  );

  return (
    <div className={styles.row}>
      <h1
        style={{ backgroundColor: currentPlayer === self?.gameId && "white" }}
      >
        {username}
      </h1>
      <h1>
        {self?.wins || 0} - {opponent?.wins || 0}
      </h1>
      <h1
        style={{
          backgroundColor: currentPlayer === opponent?.gameId && "white",
        }}
      >
        {waitingForOpponent ? "waiting for player" : opponent?.username}
      </h1>
    </div>
  );
};

export default FirstRow;
