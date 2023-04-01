import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useSelector } from "react-redux";
import Login from "../components/Auth/Login";
import AccountInfo from "../components/Auth/AccountInfo";
import { Util } from "../helpers/GlobalUtil";
import GameLink from "../components/Home/GameLink";
import useGlobalStore from "../store/global";
export default function Home() {
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  const loading = useGlobalStore((state) => state.authLoading);
  return (
    <div className={styles.home}>
      <Head>
        <title>Numpuzz | Solve number puzzles</title>
        <meta
          name="description"
          content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Numpuzz</h1>
        <div className={styles.authSection}>
          {loading && <h2>Numpuzz User</h2>}
          {!loading && !isLoggedIn && <Login />}
          {!loading && isLoggedIn && <AccountInfo />}
        </div>
      </header>

      <main>
        <div>
          <h3>Play Zone</h3>
          {Util.getGames().map((each) => (
            <GameLink key={each.url} name={each.name} url={each.url} />
          ))}
        </div>
        <div className={styles.p1}>
          <p>
            Number games play a vital role in training brain muscles. This
            platform Numpuzz will serve that purpose really well. We at numpuzz
            are commited to give you as creative mind games as possible so that
            you can enjoy playing them and side by side training your brain
            muscles. These games will be totally free so anyone in the world can
            come and solve these creative puzzles.
          </p>
        </div>
        <div className={styles.p2}>
          <p>
            We have games like number riddle in which you have to slide the
            numbers to make a specific pattern. More games will be coming in the
            future for you to play. We are also going to add multiplayer
            features to these games so that you can compete with your friends
            and random people around the Globe and show your brain skills. So
            stay tuned for more and exciting number games.
          </p>
        </div>
      </main>
      <footer>
        <hr />
        <div>Copyright © 2022-2022 numpuzz LLC. All rights reserved.</div>
      </footer>
    </div>
  );
}
