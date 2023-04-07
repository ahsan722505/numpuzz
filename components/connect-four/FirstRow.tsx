import React, { useState } from "react";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
import TurnTimer from "./TurnTimer";
const FirstRow = ({
  currentPlayer,
  setCurrentPlayer,
}: {
  currentPlayer: 1 | 2;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<1 | 2>>;
}) => {
  const username = useGlobalStore((state) => state.username);
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const waitingForOpponent = useConnectFourStore(
    (state) => state.waitingForOpponent
  );

  return (
    <div className="flex items-center mb-12">
      <h1 className="text-2xl text-blue ml-2 mr-2">{username}</h1>
      <TurnTimer
        profileSrc={"/photo.jpg"}
        startTimer={currentPlayer === self?.gameId}
        setCurrentPlayer={setCurrentPlayer}
      />
      <h1 className="text-3xl text-blue ml-2 mr-2">{self?.wins || 0}</h1>
      <h1 className="text-3xl text-blue ml-2 mr-2">{opponent?.wins || 0}</h1>
      <TurnTimer
        profileSrc={"/photo.jpg"}
        startTimer={currentPlayer === opponent?.gameId}
        setCurrentPlayer={setCurrentPlayer}
      />
      <h1 className="text-2xl text-blue ml-2 mr-2">
        {waitingForOpponent ? "waiting for player" : opponent?.username}
      </h1>
    </div>
  );
};

export default FirstRow;
