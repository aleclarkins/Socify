import { Tooltip, Zoom } from "@mui/material";
import Image from "next/image";

function SidebarRow({ name, user, image }) {
  return (
    <div className="grid grid-cols-3 items-center space-x-2 p-4 rounded-xl cursor-pointer">
      <Tooltip
        TransitionComponent={Zoom}
        placement="top"
        title="'Profile Pages' coming soon"
        arrow
      >
        <div className="flex col-span-2">
          <Image
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            layout="fixed"
          />
          <div className="flex flex-col pl-2">
            <p className="hidden sm:inline-flex font-medium text-gray-300">
              {name}
            </p>
            <p className="text-gray-500 text-xs">{user}</p>
          </div>
        </div>
      </Tooltip>
      <div className="justify-end">
        <Tooltip
          TransitionComponent={Zoom}
          placement="right"
          title="'Follow' feature coming soon"
          arrow
        >
          <button className="hover:bg-gray-400 hover:text-white text-sm text-gray-800 bg-white font-bold p-2 px-4 rounded-full">
            Follow
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default SidebarRow;
