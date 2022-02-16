import Link from "next/link";
import Header from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";

export default function profile() {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        exit={{ opacity: 0 }}
        className="bg-gray-900 h-screen scrollbar-hide"
      >
        <Header />
        <div className="flex flex-col items-center h-screen place-content-center scrollbar-hide">
          <div className="flex flex-col -mt-32 items-center p-8 shadow-md bg-gray-700 rounded-2xl w-96">
            <h1 className="text-2xl font-bold text-white">
              Profile Page Coming Soon
            </h1>
            <Link href="/">
              <button className="mt-5 p-5 bg-neutral-200 text-gray-700 rounded-full hover:bg-neutral-500 hover:text-white">
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
