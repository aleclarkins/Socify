import InputBox from "./InputBox";
import Posts from "./Posts";
import { motion } from "framer-motion";

function Feed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-grow h-screen pb-44 pt-2 ml-4 mr-4 overflow-y-auto scrollbar-hide"
    >
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <InputBox />
        <Posts />
      </div>
    </motion.div>
  );
}

export default Feed;
