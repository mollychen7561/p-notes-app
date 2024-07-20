import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="w-full col-span-2">
      <div className="relative rounded-full">
        <button
          type="submit"
          className="absolute top-0 end-0 p-3.5 pr-5 font-medium h-full text-gray-700 bg-white-100 rounded-full"
        >
          <svg
            className="w-3 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <input
          type="search"
          id="search-dropdown"
          className="border-transparent focus:border-transparent focus:ring-0 block p-2.5 pl-5 w-full text-justify text-md text-gray-900 bg-violet-50 rounded-full"
          placeholder="Search notes..."
          // onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
