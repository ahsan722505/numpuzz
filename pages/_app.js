import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../reduxStore/index";
import AuthHOC from "../HigherOrderComp/AuthHOC";
import Notification from "../components/UI/Notification";
import useGlobalStore from "../store/global";
import LoggedOutBanner from "../components/UI/LoggedOutBanner";
import { useRouter } from "next/router";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  const authLoading = useGlobalStore((state) => state.authLoading);
  const router = useRouter();
  const connectFourRoute =
    router.pathname === "/connect-four" ||
    router.pathname === "/connect-four/[roomId]";
  return (
    <Provider store={store}>
      <AuthHOC>
        <>
          <Head>
            <link rel="icon" href="/favicon.jpg" />
          </Head>
          {!authLoading && !isLoggedIn && !connectFourRoute && (
            <LoggedOutBanner />
          )}
          <Component {...pageProps} />
          <Notification />
        </>
      </AuthHOC>
    </Provider>
  );
}

export default MyApp;
