import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/Loader";
import { setSocket } from "../../reduxStore/ConnectFourSlice";

const Index = () => {
  const { socket, loading } = useSelector((state) => state.connectFour);
  const { authLoading, username } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!socket) dispatch(setSocket());
  }, []);
  const createRoom = () => {
    // socket.emit("create-room", username);
    // socket.on("room-created", (roomId) =>
    //   router.push(`connect-four/${roomId}?host=true`)
    // );

    socket.send(JSON.stringify({ Type: "create-room", Data: username }));
    socket.onmessage = (payload) => {
      console.log(payload);
      const data = JSON.parse(payload.data);
      console.log(data);
      if (data.Type === "room-created")
        router.push(`connect-four/${data.Data}?host=true`);
    };
  };

  return (
    <>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && (
        <button onClick={createRoom}>play with friend</button>
      )}
    </>
  );
};

export default Index;
