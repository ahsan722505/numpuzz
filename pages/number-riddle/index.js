import Head from "next/head";
import App from "../../components/number-riddle/App";
import {GameContextProvider} from "../../store/number-riddle/GameContext";
const index = () => {
  return (
    <GameContextProvider>
      <Head>
        <title>Number Riddle</title>
        <meta name="description" content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain." />
      </Head>
      <style global jsx>{`
        body {
          background: #F9F9C5;
        }
      `}</style>
        <App/>
    </GameContextProvider>
  )
}

export default index