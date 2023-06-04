import React from "react";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
import TurnTimer from "./TurnTimer";
import Chat from "./Chat";
const FirstRow = () => {
  const username = useGlobalStore((state) => state.username);
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const selfMessage = useConnectFourStore((state) => state.selfMessage);
  const opponentMessage = useConnectFourStore((state) => state.opponentMessage);
  const waitingForOpponent = useConnectFourStore(
    (state) => state.waitingForOpponent
  );

  return (
    <div className="flex items-center mb-12">
      <h1 className="text-2xl text-blue ml-2 mr-2">{username}</h1>
      <Chat message={selfMessage}>
        <TurnTimer profileSrc={"/photo.jpg"} gameId={self?.gameId} />
      </Chat>
      <h1 className="text-3xl text-blue ml-2 mr-2">{self?.wins || 0}</h1>
      <h1 className="text-3xl text-blue ml-2 mr-2">{opponent?.wins || 0}</h1>
      <Chat message={opponentMessage}>
        <TurnTimer profileSrc={"/photo.jpg"} gameId={opponent?.gameId} />
      </Chat>
      <h1 className="text-2xl text-blue ml-2 mr-2">
        {waitingForOpponent ? "waiting for player" : opponent?.username}
      </h1>
    </div>
  );
};

export default FirstRow;
