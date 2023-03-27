import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "../../components/connect-four/Game";
import {
  setOpponent,
  setSelf,
  setWaitingForOpponent,
} from "../../reduxStore/ConnectFourSlice";
import { detach, emit, listen } from "../../websocket";

const Index = () => {
  const { loading } = useSelector((state) => state.connectFour);
  const { authLoading, username } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const router = useRouter();
  const { host, roomId } = router.query;

  useEffect(() => {
    if (roomId && username) {
      if (!host) {
        emit("join-room", { username, roomId });
      }
      listen("start-game", (data) => {
        data.forEach((e) => {
          if (e.Username === username)
            dispatch(setSelf({ username: e.Username, host: e.Host, id: e.Id }));
          else
            dispatch(
              setOpponent({ username: e.Username, host: e.Host, id: e.Id })
            );
        });
        dispatch(setWaitingForOpponent(false));
      });
    }

    return () => {
      detach("start-game");
    };
  }, [roomId, username]);
  return (
    <>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <Game />}
    </>
  );
};
export default Index;
