import { AnimatePresence, motion } from "framer-motion";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { guestState } from "../../atoms/guestAtom";

function Signin({ providers }) {
  const [isGuest, setIsGuest] = useRecoilState(guestState);

  return (
    <div className="grid place-content-center h-screen bg-gray-900">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key="signin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center space-y-10 pb-20"
        >
          <h1 className="font-extrabold text-gray-50 text-6xl">
            <span className="text-blue-500">Socify</span>
          </h1>
          <>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex items-center justify-center p-4 from-blue-900 to-blue-400 bg-gradient-to-r hover:to-blue-600 w-60 rounded-full text-white text-center cursor-pointer"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <h1 className="text-lg font-bold">
                    <span className="text-blue-300">Sign in with</span>{" "}
                    {provider.name}
                  </h1>
                </button>
              </div>
            ))}
            <Link href="/">
              <button
                className="flex items-center justify-center p-4 from-blue-900 to-blue-400 bg-gradient-to-r hover:to-blue-600 w-60 rounded-full text-white text-center cursor-pointer"
                onClick={() => setIsGuest(true)}
              >
                <h1 className="text-lg font-bold">
                  <span className="text-blue-300">Sign in as</span> Guest
                </h1>
              </button>
            </Link>
            <div className="mx-24">
              <p className="text-gray-500">
                <span className="font-bold">Note:</span> Socify is still
                currently in development. Features such as posting, liking, and
                commenting are temporarily disabled. To view a demo, please
                visit the Socify{" "}
                <a
                  className="underline text-blue-400 hover:text-blue-600"
                  href="https://github.com/aleclarkins/Socify"
                >
                  GitHub
                </a>{" "}
                repository.
              </p>
            </div>
          </>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default Signin;
