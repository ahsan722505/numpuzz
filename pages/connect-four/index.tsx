import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../../components/UI/Loader";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
import { detach, emit, listen } from "../../websocket";

const Index = () => {
  const loading = useConnectFourStore((state) => state.opponent);
  const authLoading = useGlobalStore((state) => state.authLoading);
  const username = useGlobalStore((state) => state.username);
  const userId = useGlobalStore((state) => state.userId);
  const photo = useGlobalStore((state) => state.photo);
  const router = useRouter();
  useEffect(() => {
    return () => detach("room-created");
  }, []);
  const createRoom = () => {
    emit("create-room", { username, userId, photo });
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
