"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

const AppBar = () => {
  const { status } = useSession();
  const isUserLoggedIn = status === "authenticated";

  const pathname = usePathname();

  // Hide navbar on these pages
  const hideOnPages = ["/login", "/register","/verifyemail","/attemptquiz"];

  if (hideOnPages.includes(pathname) || pathname.startsWith("/attemptquiz")) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-10 min-w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap py-3 flex-col md:flex-row items-center justify-between gap-4">
        <a className="flex title-font font-medium items-center text-gray-900">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="ml-2 text-lg font-bold text-gray-900">Quiz Up</span>
        </a>

        <div className="flex gap-3 items-center">
          {isUserLoggedIn && (
            <button className="text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-sm">
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
            className={`inline-flex items-center border-0 py-2 px-4 focus:outline-none rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 ${
              isUserLoggedIn
                ? "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300"
                : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
            }`}
          >
            {isUserLoggedIn ? "Log out" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
