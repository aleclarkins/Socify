import { useSession } from "next-auth/react";

import ProfileFollowRow from "./ProfileFollowRow";

import Image from "next/image";

import elonmusk from "../public/elonmusk.jpeg";
import justin from "../public/justin bieber.jpeg";
import kanye from "../public/kanyewest.jpeg";
import rivian from "../public/rivian.jpeg";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip, Zoom } from "@mui/material";

function Sidebar() {
  const { data: session } = useSession();
  const sessionGuest = {
    user: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/socify-a7183.appspot.com/o/GuestImage.jpeg?alt=media&token=1599552c-3813-43eb-8807-302dce19ef52",
      name: "Guest",
    },
  };
  return (
    <div className="hidden md:flex flex-col w-80 overflow-y-auto h-screen scrollbar-hide pb-40">
      <AnimatePresence exitBeforeEnter>
        {/* Profile overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden md:inline mt-2 xl:min-w[300px] bg-gray-800 rounded-2xl shadow-md ml-4 h-[22rem]"
        >
          <div>
            <div className="flex justify-center p-6">
              <Image
                className="rounded-full"
                src={session ? session.user.image : sessionGuest.user.image}
                height={60}
                width={60}
              />
            </div>
            <div className="flex flex-col items-center pb-2 mx-2 border-b-2 border-gray-700 ">
              <p className="text-xl text-gray-300 font-medium">
                {session ? session.user.name : sessionGuest.user.name}
              </p>
              <p className="my-2 w-40 text-center text-gray-400">
                Web Developer who loves to code
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col flex-grow p-3 items-center">
              <p className="text-gray-300 font-medium pb-1">3,484</p>
              <p className="text-gray-400 text-sm">Following</p>
            </div>
            <div className="border-gray-700 border my-2"></div>
            <div className="flex flex-col flex-grow p-3 items-center">
              <p className="text-gray-300 font-medium pb-1">11.5k</p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
          </div>
          <div className="flex flex-col items-center mx-2 p-6 border-t-2 border-gray-700 ">
            <p className="text-blue-500 cursor-pointer">My Profile</p>
          </div>
        </motion.div>

        {/* Recommended Profiles */}
        <motion.div
          key="recommended"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hidden md:inline mt-5 pb-2 xl:min-w[300px] bg-gray-800 rounded-2xl shadow-md ml-4 max-h-[22rem]"
        >
          <p className="p-4 pl-6 text-gray-50 font-bold text-md">Recommended</p>
          <ProfileFollowRow
            name="Elon Musk"
            user="@elonmusk"
            image={elonmusk}
          />
          <ProfileFollowRow
            name="Justin Bieber"
            user="@justinbieber"
            image={justin}
          />
          <ProfileFollowRow name="Rivian" user="@rivian" image={rivian} />
          <ProfileFollowRow name="Kanye West" user="@ye" image={kanye} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Sidebar;
