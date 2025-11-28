"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (
    pathname.startsWith("/attemptquiz") ||
    pathname.startsWith("/lobby") ||
    pathname.startsWith("/results") ||
    pathname.startsWith("/competequiz")
  ) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 bg-white w-68 border-r border-gray-200 font-medium px-4 h-screen pt-24 overflow-y-auto flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 mb-4">
            Navigation
          </h2>
          <nav className="space-y-1">
            <LinkComponent
              pageLink="quizzes"
              linkText="Quizzes"
              isActive={pathname === "/quizzes"}
              onClick={() => setIsOpen(false)}
            />
            <LinkComponent
              pageLink="generatequiz"
              linkText="Generate Quiz"
              isActive={pathname === "/generatequiz"}
              onClick={() => setIsOpen(false)}
            />
            <LinkComponent
              pageLink="compete"
              linkText="Compete"
              isActive={pathname === "/compete"}
              onClick={() => setIsOpen(false)}
            />
            <LinkComponent
              pageLink="quizhistory"
              linkText="History"
              isActive={pathname === "/quizhistory"}
              onClick={() => setIsOpen(false)}
            />
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200 mb-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Quick Tip
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Generate quizzes on any topic instantly using AI. Perfect for
              studying!
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

interface LinkComponentProps {
  pageLink: string;
  linkText: string;
  isActive: boolean;
  onClick?: () => void;
}

const LinkComponent = ({
  pageLink,
  linkText,
  isActive,
  onClick,
}: LinkComponentProps) => {
  return (
    <Link
      href={`/${pageLink}`}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
        isActive
          ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 font-semibold"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 to-emerald-600"></div>
      )}
      <span className="text-sm">{linkText}</span>
    </Link>
  );
};
