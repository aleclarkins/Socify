import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import LeftSidebar from "../components/LeftSidebar";
import Feed from "../components/Feed";
import RightSidebar from "../components/RightSidebar";
import Login from "../components/Login";

import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <Login />;
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
