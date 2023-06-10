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
  const setLoading = useConnectFourStore((state) => state.setLoading);
  const flushState = useConnectFourStore((state) => state.flushState);
  const persistedRoomId = useConnectFourStore((state) => state.persistedRoomId);
  const setPersistedRoomId = useConnectFourStore(
    (state) => state.setPersistedRoomId
  );
  const opponent = useConnectFourStore((state) => state.opponent);
  const self = useConnectFourStore((state) => state.self);
  const authLoading = useGlobalStore((state) => state.authLoading);
  const username = useGlobalStore((state) => state.username);
  const userId = useGlobalStore((state) => state.userId);
  const photo = useGlobalStore((state) => state.photo);
  const [validRoom, setValidRoom] = React.useState(false);
  const router = useRouter();
  const { roomId } = router.query;
  console.log("self", self);

  useEffect(() => {
    const checkDataValidity = async () => {
      if (roomId != persistedRoomId) {
        console.log("clearing storage");
        flushState();
        localStorage.removeItem("connectFourBoard");
        setPersistedRoomId(roomId as string);
      }
      setLoading(false);
    };
    if (roomId) checkDataValidity();
  }, [roomId]);
  useEffect(() => {
    if (roomId === "bot") return;
    if (roomId && username && userId && photo) {
      emit("join-room", {
        username,
        roomId,
        userId,
        photo,
      });
    }
  }, [roomId, username, userId, photo]);

  useEffect(() => {
    if (roomId === "bot" && username && userId && photo) {
      // setting up game for bot mode
      setValidRoom(true);
      setSelf({
        username,
        userId,
        wins: 0,
        gameId: 1,
        photo,
      });
      setOpponent({
        username: "ahsan.js",
        userId: "bot",
        wins: 0,
        gameId: 2,
        photo: "/bot.jpg",
      });
      startGame();
    }
  }, [roomId, username, userId, photo]);

  useEffect(() => {
    if (roomId === "bot") return;
    listen("start-game", (data) => {
      data.forEach((e) => {
        if (e.UserId === userId) {
          setSelf({
            username: e.Username,
            userId: e.UserId,
            wins: 0,
            gameId: e.GameId,
            photo: e.Photo,
          });
        } else {
          setOpponent({
            username: e.Username,
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
    listen("badRequest", () => {
      router.push("/404");
    });
    listen("validRoom", () => {
      setValidRoom(true);
    });
    listen("leaveGame", () => {
      console.log("opponent2", opponent);
      setNotification({
        message: `${opponent?.username} left the game.`,
      });
      router.push("/connect-four");
      localStorage.removeItem("connectFourBoard");
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
      {(loading || authLoading || !validRoom) && <Loader />}
      {!loading && !authLoading && validRoom && <Game />}
    </>
  );
};
export default Index;
