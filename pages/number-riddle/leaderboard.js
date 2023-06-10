import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeaderBoard from "../../components/number-riddle/Leaderboard";
import Loader from "../../components/UI/Loader";
import { getTop } from "../../reduxStore/NumberRiddleSlice";
import useGlobalStore from "../../store/global";
const Leaderboard = () => {
  const { loading, leaderBoardSize, leaderBoardData } = useSelector(
    (state) => state.numberRiddle
  );
  const authLoading = useGlobalStore((state) => state.authLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!leaderBoardData[leaderBoardSize]) dispatch(getTop(leaderBoardSize));
  }, [leaderBoardSize]);
  return (
    <>
      <Head>
        <title>Number Riddle | leaderboard</title>
        <meta
          name="description"
          content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain."
        />
      </Head>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <LeaderBoard />}
    </>
  );
};
export default Leaderboard;
