function SidebarRow({ tag, posts }) {
  return (
    <div className="grid grid-cols-3 items-center space-x-2 px-2 py-2 rounded-xl hover:bg-gray-700 mx-2 cursor-pointer">
      <div className="flex col-span-2">
        <div className="flex flex-col pl-2">
          <p className="hidden sm:inline-flex font-medium text-gray-300">
            {tag}
          </p>
          <p className="text-gray-500 text-xs">{posts}</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarRow;
