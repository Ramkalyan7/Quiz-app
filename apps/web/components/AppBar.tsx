"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

const AppBar = () => {
  const { status } = useSession();
  const isUserLoggedIn = status === "authenticated";

  const pathname = usePathname();

  // Hide navbar on these pages
  const hideOnPages = ["/login", "/signup"];

  if (hideOnPages.includes(pathname)) {
    return null;
  }

  return (
    <div className="container border-b border-gray-300 fixed top-0 right-0 left-0 bg-slate-200 z-10 min-w-screen flex flex-wrap px-7 py-2 flex-col md:flex-row items-center justify-between">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-9 h-9 text-white p-2 bg-blue-700 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-md font-bold">Quiz Up</span>
      </a>
      <div>
        {isUserLoggedIn && (
          <button className="mr-5 text-blue-900 inline-flex items-center bg-gray-300 border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 rounded-md  mt-4 md:mt-0 cursor-pointer text-sm font-semibold">
            Upgrade Now
          </button>
        )}

        <button
          onClick={() => {
            if (isUserLoggedIn) {
              signOut();
            } else {
              redirect("/login");
            }
          }}
          className={`${isUserLoggedIn ? "bg-red-500 text-white" : "bg-black text-white"}  inline-flex items-center  border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-800 rounded-lg mt-4 md:mt-0 cursor-pointer text-sm font-semibold`}
        >
          {isUserLoggedIn ? "Log out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AppBar;
