import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function Login() {
  return (
    <div className="grid place-content-center h-screen bg-gray-900 pb-20">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center text-center space-y-10"
        >
          <h1 className="font-extrabold text-gray-50 text-5xl px-5 sm:px-0 sm:text-6xl">
            Hi, welcome to <span className="text-blue-500">Socify</span>!
          </h1>
          <Link href="/auth/signin">
            <div className="flex items-center justify-center p-3 from-blue-900 to-blue-400 bg-gradient-to-r hover:to-blue-600 w-40 rounded-full text-white text-center cursor-pointer">
              <h1 className="text-xl font-bold">Get Started</h1>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;
