import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../../components/UI/Loader";
import useConnectFourStore from "../../store/connect-four";
import useGlobalStore from "../../store/global";
import { detach, emit, listen } from "../../websocket";
import Button from "../../components/number-riddle/Button";

const Index = () => {
  const authLoading = useGlobalStore((state) => state.authLoading);
  const username = useGlobalStore((state) => state.username);
  const userId = useGlobalStore((state) => state.userId);
  const photo = useGlobalStore((state) => state.photo);
  const setShowLinkModal = useConnectFourStore(
    (state) => state.setShowLinkModal
  );
  const [createRoomLoading, setCreateRoomLoading] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    return () => detach("room-created");
  }, []);
  const createRoom = () => {
    setCreateRoomLoading(true);
    emit("create-room", { username, userId, photo });
    listen("room-created", async (roomId) => {
      console.log("roomId", roomId);
      router.push(`connect-four/${roomId}`);
      setShowLinkModal(true);
    });
  };

  const playWithBot = () => {
    router.push("connect-four/bot");
  };
  const playWithFriendButtonContent = createRoomLoading
    ? "Creating room..."
    : "Play with friend";

  return (
    <>
      {authLoading && <Loader />}
      {!authLoading && (
        <>
          <h1 className="text-center text-purple text-3xl mt-16">
            Connect four dots in any direction!
          </h1>
          <div className="w-screen h-[80vh] flex justify-center items-center flex-col">
            <Button
              onClick={playWithBot}
              style={{ padding: "1rem", marginBottom: "2rem" }}
            >
              Play with bot
            </Button>
            <Button style={{ padding: "1rem" }} onClick={createRoom}>
              {playWithFriendButtonContent}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
