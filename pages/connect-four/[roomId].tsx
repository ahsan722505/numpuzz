import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Game from "../../components/connect-four/Game";
import Loader from "../../components/UI/Loader";
import useConnectFourStore from "../../store/connect-four";
import { detach, emit, listen } from "../../websocket";
import { shallow } from "zustand/shallow";
import useGlobalStore from "../../store/global";

const Index = () => {
  const { loading, setOpponent, setSelf } = useConnectFourStore(
    (state) => ({
      loading: state.loading,
      setSelf: state.setSelf,
      setOpponent: state.setOpponent,
    }),
    shallow
  );

  const startGame = useConnectFourStore((state) => state.startGame);
  const setWaitingForOpponent = useConnectFourStore(
    (state) => state.setWaitingForOpponent
  );
  const setNotification = useGlobalStore((state) => state.setNotification);
  const flushState = useConnectFourStore((state) => state.flushState);
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const authLoading = useGlobalStore((state) => state.authLoading);
  const username = useGlobalStore((state) => state.username);
  const userId = useGlobalStore((state) => state.userId);
  const photo = useGlobalStore((state) => state.photo);
  const router = useRouter();
  const { host, roomId } = router.query;

  useEffect(() => {
    if (roomId && username && userId && photo) {
      emit("join-room", {
        username,
        roomId,
        userId,
        photo,
        host: Boolean(host),
      });
    }

    listen("start-game", (data) => {
      data.forEach((e) => {
        if (e.UserId === userId) {
          setSelf({
            username: e.Username,
            host: e.Host,
            userId: e.UserId,
            wins: 0,
            gameId: e.GameId,
            photo: e.Photo,
          });
        } else {
          setOpponent({
            username: e.Username,
            host: e.Host,
            userId: e.UserId,
            wins: 0,
            gameId: e.GameId,
            photo: e.Photo,
          });
          console.log(e);
        }
      });
      startGame();
    });
    listen("playAgainRequest", () => {
      setNotification({
        message: `${opponent?.username} wants to play Again.`,
      });
      setWaitingForOpponent(false);
    });
    listen("playAgain", () => {
      startGame();
    });
    listen("leaveGame", () => {
      setNotification({
        message: `${opponent?.username} left the game.`,
      });
      router.push("/connect-four");
      flushState();
    });

    return () => {
      detach("start-game");
      detach("playAgainRequest");
      detach("playAgain");
      detach("leaveGame");
    };
  }, [roomId, username, userId, opponent, self]);
  return (
    <>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <Game />}
    </>
  );
};
export default Index;
