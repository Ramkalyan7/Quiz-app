"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const AppBar = () => {
  const { status } = useSession();
  const isUserLoggedIn = status === "authenticated";

  const pathname = usePathname();

  // Hide navbar on these pages
  const hideOnPages = ["/login", "/register", "/verifyemail", "/attemptquiz"];

  if (
    hideOnPages.includes(pathname) ||
    pathname.startsWith("/attemptquiz") ||
    pathname.startsWith("/lobby") ||
    pathname.startsWith("/results") ||
    pathname.startsWith("/competequiz")
  ) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-50 w-full">
      <div className="mx-auto px-3 sm:px-4 lg:px-8 flex py-2 sm:py-3 items-center justify-between">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="ml-1.5 sm:ml-2 text-base sm:text-lg font-bold text-gray-900">
            Quiz Up
          </span>
        </Link>

        <button
          onClick={() => {
            if (isUserLoggedIn) {
              signOut();
            } else {
              redirect("/login");
            }
          }}
          className={`inline-flex items-center border-0 py-1.5 sm:py-2 px-3 sm:px-4 focus:outline-none rounded-lg cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-200 ${
            isUserLoggedIn
              ? "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300"
              : "bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
          }`}
        >
          {isUserLoggedIn ? "Log out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AppBar;
