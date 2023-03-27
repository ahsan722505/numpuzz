import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader";
import { detach, emit, listen } from "../../websocket";

const Index = () => {
  const { loading } = useSelector((state) => state.connectFour);
  const { authLoading, username } = useSelector((state) => state.global);
  const router = useRouter();
  useEffect(() => {
    return () => detach("room-created");
  }, []);
  const createRoom = () => {
    emit("create-room", username);
    listen("room-created", (roomId) => {
      router.push(`connect-four/${roomId}?host=true`);
    });
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
