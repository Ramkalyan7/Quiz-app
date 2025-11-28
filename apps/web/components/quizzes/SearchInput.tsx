"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SearchInput = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearchButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.length == 0) {
      toast.error("Please enter Something");
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", searchTerm);
    params.set("page", "1");

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={onSearchButtonClick}
      className="max-w-md mx-auto"
    >
      <div className="flex gap-2">
        <div className="relative grow">
          <input
            type="text"
            id="simple-search"
            className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="Search topic or tag..."
            onChange={onSearchInputChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
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
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
