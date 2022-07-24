import '../styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
config.autoAddCss = false; 


function MyApp({ Component, pageProps }) {
  return(
    <>
    <Head>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
    )
}

export default MyApp
