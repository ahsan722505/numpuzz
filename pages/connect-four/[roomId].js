import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Game from "../../components/connect-four/Game";
import {
  setOpponent,
  setSelf,
  setSocket,
  setWaitingForOpponent,
} from "../../reduxStore/ConnectFourSlice";

const Index = () => {
  const { loading } = useSelector((state) => state.connectFour);
  const { authLoading, username } = useSelector((state) => state.global);
  const { socket } = useSelector((state) => state.connectFour);
  const dispatch = useDispatch();
  const router = useRouter();
  const { host, roomId } = router.query;
  console.log(router.query);
  useEffect(() => {
    if (!socket) dispatch(setSocket());
    if (socket && roomId && username) {
      if (!host) socket.emit("join-room", { username, roomId });
      socket.on("start-game", (data) => {
        for (let key in data.users) {
          if (key !== socket.id) {
            dispatch(setOpponent(data.users[key]));
          } else {
            dispatch(setSelf(data.users[key]));
          }
        }
        dispatch(setWaitingForOpponent(false));
      });
    }
  }, [socket, roomId, username]);
  return (
    <>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <Game />}
    </>
  );
};
export default Index;
