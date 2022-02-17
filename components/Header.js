import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";

import { signOut, useSession } from "next-auth/react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/cjs/react.production.min";
import { useState } from "react";
import Link from "next/link";
import { Tooltip, Zoom } from "@mui/material";

function Header() {
  const { data: session } = useSession();
  session ? console.log("session active") : console.log("session not active");
  let [isSignedOut, setIsSignedOut] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-gray-900 flex items-center px-10 p-2 pt-3">
      {/* Left */}
      <div className="flex w-96 items-center">
        <h1 className="text-blue-500 font-black text-4xl mr-2">
          S<span className="text-lg text-blue-200">ocify</span>
        </h1>
        <div className="hidden sm:flex ml-2 items-center rounded-full bg-gray-800 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <Tooltip
            TransitionComponent={Zoom}
            placement="right"
            title="'Search' feature coming soon"
            arrow
          >
            <input
              className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-grey-500 text-gray-300 
              flex-shrink"
              type="text"
              placeholder="Search Socify"
            />
          </Tooltip>
        </div>
      </div>
      <div className="w-full"></div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <div className="flex sm:hidden items-center rounded-full bg-gray-800 p-2">
          <SearchIcon className="h-6 text-gray-600" />
        </div>
        <Link href="/">
          <HomeIcon className="hidden sm:inline-flex icon" />
        </Link>
        <Tooltip
          className="hidden sm:inline-flex"
          TransitionComponent={Zoom}
          placement="bottom"
          title="'Messaging' feature coming soon"
          arrow
        >
          <div>
            <ChatIcon className="icon" />
          </div>
        </Tooltip>
        <Tooltip
          className="hidden sm:inline-flex"
          TransitionComponent={Zoom}
          placement="bottom"
          title="'Notification' feature coming soon"
          arrow
        >
          <div>
            <BellIcon className="icon" />
          </div>
        </Tooltip>

        {/* Account dropdown menu: Logout */}
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <div className="cursor-pointer w-12 sm:w-50 rounded-full flex items-center space-x-2 bg-gray-800 p-1">
                <div className="flex">
                  <Image
                    onClick={signOut}
                    className="rounded-full cursor-pointer"
                    src={session.user.image}
                    width="40"
                    height="40"
                    layout="fixed"
                  />
                </div>
                <div className="flex">
                  <p className="whitespace-nowrap font-semibold text-gray-300 pr-2 text-xs">
                    <span className="hidden sm:flex">{session.user.name}</span>
                    <ChevronDownIcon className="ml-2 w-4" />
                  </p>
                </div>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-20 mt-2 origin-top-right bg-gray-600 divide-y divide-gray-100 rounded-full shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <button
                    onClick={() => setIsSignedOut(true)}
                    className="text-red-500 justify-center font-medium group flex rounded-full items-center w-full px-2 py-2 text-sm hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Logout Modal */}
      <div>
        <Transition appear show={isSignedOut} as={Fragment}>
          <Dialog
            open={isSignedOut}
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsSignedOut(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className=" flex text-lg font-medium leading-6 text-gray-50 justify-center"
                  >
                    Are you sure you want to logout?
                  </Dialog.Title>
                  <div className="mt-4 flex justify-center">
                    <button
                      className="bg-gray-500 hover:bg-gray-600 hover:text-red-600 rounded-full text-red-500 p-4 m-2"
                      onClick={signOut}
                    >
                      Logout
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 rounded-full text-gray-50 p-4 m-2"
                      onClick={() => setIsSignedOut(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default Header;
