import Head from 'next/head'
import Link from "next/link";
export default function Home() {
  return (
    <div >
      <Head>
        <title>Numpuzz | Solve number riddles</title>
        <meta name="description" content="Numpuz: Number Riddle is a classic math puzzle game online available for free. Tap and move the wood number tiles, enjoy the magic of digit, coordinate your eyes, hands and brain." />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main >
          <h1>Welcome to Numpuzz</h1>
          <Link href="/number-riddle">Number riddle</Link>
      </main>

      <footer >
        
      </footer>
    </div>
  )
}
