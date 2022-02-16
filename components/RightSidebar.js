import { Tooltip, Zoom } from "@mui/material";
import HashtagRow from "./HashtagRow";

function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-80 overflow-y-auto h-screen scrollbar-hide pb-40">
      <Tooltip
        TransitionComponent={Zoom}
        placement="left"
        title="'View Posts by Hashtag' feature available soon"
        arrow
      >
        <div className="hidden lg:inline mt-2 xl:min-w[300px] bg-gray-800 rounded-2xl shadow-md mr-4 max-h-[44rem] pb-2">
          <p className="p-4 pl-6 text-gray-50 font-bold text-lg">Trending</p>
          <p className=" text-gray-500 font-semibold mx-6 pb-2">Tech</p>
          <HashtagRow tag="#softwaredeveloper" posts="24k Posts" />
          <HashtagRow tag="#techgadgets" posts="52.5k Posts" />
          <HashtagRow tag="#desksetup" posts="9.7k Posts" />
          <p className=" text-gray-500 font-semibold border-t border-gray-700 mx-6 pt-2">
            Sports
          </p>
          <HashtagRow tag="#rams" posts="34k Posts" />
          <HashtagRow tag="#superbowl" posts="282k Posts" />
          <HashtagRow tag="#football" posts="42.3k Posts" />
          <p className=" text-gray-500 font-semibold border-t border-gray-700 mx-6 pt-2">
            Medical
          </p>
          <HashtagRow tag="#covid19" posts="397k Posts" />
          <HashtagRow tag="#flu" posts="414k Posts" />
          <HashtagRow tag="#nursing" posts="204k Posts" />
        </div>
      </Tooltip>
    </div>
  );
}

export default Widgets;
