import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";
import Login from "../components/Login";

import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { guestState } from "../atoms/guestAtom";

export default function Home() {
  const [isGuest, setIsGuest] = useRecoilState(guestState);
  console.log("Guest is: " + isGuest);

  const { data: session } = useSession();

  if (!session) {
    if (isGuest === false) {
      return <Login />;
    }
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-screen bg-gray-900 overflow-hidden">
        <motion.div
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Head>
            <title>Socify</title>
          </Head>

          <Header />

          <main className="flex">
            <LeftSidebar />
            <Feed />
            <RightSidebar />
          </main>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
