import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;
