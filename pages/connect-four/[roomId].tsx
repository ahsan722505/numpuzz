import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Game from "../../components/connect-four/Game";
import Loader from "../../components/UI/Loader";
import useConnectFourStore from "../../store/connect-four";
import { detach, emit, listen } from "../../websocket";
import { shallow } from "zustand/shallow";
import useGlobalStore from "../../store/global";

const Index = () => {
  const { loading, setOpponent, setSelf, setWaitingForOpponent } =
    useConnectFourStore(
      (state) => ({
        loading: state.loading,
        setSelf: state.setSelf,
        setOpponent: state.setOpponent,
        setWaitingForOpponent: state.setWaitingForOpponent,
      }),
      shallow
    );
  const authLoading = useGlobalStore((state) => state.authLoading);
  const username = useGlobalStore((state) => state.username);
  const userId = useGlobalStore((state) => state.userId);
  const photo = useGlobalStore((state) => state.photo);
  const router = useRouter();
  const { host, roomId } = router.query;

  useEffect(() => {
    if (roomId && username && userId) {
      if (!host) {
        emit("join-room", { username, roomId, userId, photo });
      }
      listen("start-game", (data) => {
        console.log(data);
        console.log(userId);

        data.forEach((e) => {
          if (e.UserId === userId) {
            console.log("ayyyy", e);

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
        setWaitingForOpponent(false);
      });
    }

    return () => {
      detach("start-game");
    };
  }, [roomId, username, userId]);
  return (
    <>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <Game />}
    </>
  );
};
export default Index;
