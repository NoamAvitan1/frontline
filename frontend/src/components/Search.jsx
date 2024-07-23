import React from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    searchParams.set(
      "s",
      e.target.value.toLowerCase().trim()
    );
    setSearchParams(searchParams);
  };
  return (
    <div tabIndex={0} className="relative mx-auto w-[300px]">
      <CiSearch className="ml-2 absolute top-[15px]" />
      <input
        onChange={handleSearch}
        className="bg-white text-gray-900 border border-black rounded-md w-[300px] text-sm outline-none p-3 focus:border-blue-600 px-7"
        placeholder="Search"
        type="text"
      />
    </div>
  );
}
