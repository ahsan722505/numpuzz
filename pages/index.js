import Head from 'next/head'
import Link from "next/link";
import styles from "../styles/Home.module.scss"
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Home() {
  return (
    <div className={styles.home} >
      <Head>
        <title>Numpuzz | Solve number puzzles</title>
        <meta name="description" content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global jsx>{`
        body {
          background: #02203c;
        }
      `}</style>
      <header>
        <h1>Numpuzz</h1>
        <h2>Only Place to solve and play number puzzle games</h2>
      </header>

      <main >
        <div>
          <h3>Play Zone</h3>
          <div>
              <Link  href="/number-riddle">
                <div>
                  <FontAwesomeIcon icon={faPlay}/>
                  <span>Number riddle</span>
                </div>
                </Link>
          </div>
          
        </div>
          <div className={styles.p1}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </div>
          <div className={styles.p2}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </div>
          <div className={styles.p3}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          </div>
      </main>
      <footer>
        <hr/>
        <div>Copyright © 2022-2022 numpuzz LLC. All rights reserved.</div>
      </footer>

      
    </div>
  )
}
