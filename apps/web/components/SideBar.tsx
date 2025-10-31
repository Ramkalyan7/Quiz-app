"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();



  if (pathname.startsWith("/attemptquiz")) {
    return null;
  }

  return (
    <aside className="bg-white w-68 border-r border-gray-200 font-medium px-4 h-screen sticky top-0 bottom-0 left-0 pt-24 overflow-y-auto flex flex-col">
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 mb-4">
          Navigation
        </h2>
        <nav className="space-y-1">
          <LinkComponent 
            pageLink="quizzes" 
            linkText="Quizzes"
            isActive={pathname === "/quizzes"}
            icon="📋"
          />
          <LinkComponent 
            pageLink="generatequiz" 
            linkText="Generate Quiz"
            isActive={pathname === "/generatequiz"}
            icon="✨"
          />
          <LinkComponent 
            pageLink="quizhistory" 
            linkText="History"
            isActive={pathname === "/quizhistory"}
            icon="🕐"
          />
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Quick Tip</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Generate quizzes on any topic instantly using AI. Perfect for studying!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

interface LinkComponentProps {
  pageLink: string;
  linkText: string;
  isActive: boolean;
  icon: string;
}

const LinkComponent = ({
  pageLink,
  linkText,
  isActive,
  icon,
}: LinkComponentProps) => {
  return (
    <Link
      href={`/${pageLink}`}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
        isActive
          ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-600 to-purple-600"></div>
      )}
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{linkText}</span>
    </Link>
  );
};
