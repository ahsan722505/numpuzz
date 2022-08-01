import '../styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { GlobalContextProvider } from '../store/GlobalContext/GlobalContext';
import Head from 'next/head';
config.autoAddCss = false; 


function MyApp({ Component, pageProps }) {
  return(
    <GlobalContextProvider>
        <>
        <Head>
            <link rel="icon" href="/favicon.jpg" />
          </Head>
          <Component {...pageProps} />
        </>
    </GlobalContextProvider>
    )
}

export default MyApp
