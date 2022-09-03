import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import App from "../../components/number-riddle/App";
import { GameContextProvider } from "../../store/number-riddle/GameContext";
import { getBest } from "../../reduxStore/NumberRiddleSlice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
const Index = () => {
  const {
    global: { loading: authLoading },
    numberRiddle: { loading, best },
  } = useSelector((state) => state);
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
      <style global jsx>{`
        body {
          background: #f9f9c5;
        }
      `}</style>
      {loading || (authLoading && <CircularProgress />)}
      {!loading && !authLoading && <App />}
    </>
  );
};

export default Index;
