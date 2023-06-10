import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../reduxStore/index";
import AuthHOC from "../HigherOrderComp/AuthHOC";
import Notification from "../components/UI/Notification";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthHOC>
        <>
          <Head>
            <link rel="icon" href="/favicon.jpg" />
          </Head>
          <Component {...pageProps} />
          <Notification />
        </>
      </AuthHOC>
    </Provider>
  );
}

export default MyApp;
