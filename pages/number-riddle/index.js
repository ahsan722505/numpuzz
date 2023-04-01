import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import App from "../../components/number-riddle/App";
import { getBest } from "../../reduxStore/NumberRiddleSlice";
import { useEffect } from "react";
import Loader from "../../components/UI/Loader";
import useGlobalStore from "../../store/global";
const Index = () => {
  const { loading, best } = useSelector((state) => state.numberRiddle);
  const authLoading = useGlobalStore((state) => state.authLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!best) dispatch(getBest());
  }, []);

  return (
    <>
      <Head>
        <title>Number Riddle</title>
        <meta
          name="description"
          content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain."
        />
      </Head>
      {(loading || authLoading) && <Loader />}
      {!loading && !authLoading && <App />}
    </>
  );
};

export default Index;
