import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="bg-slate-200 w-48 border-r border-gray-300 font-semibold px-5  h-screen  sticky top-0 bottom-0 left-0 pt-20">
      <nav>
        <div className="space-y-2">
          <LinkComponent pageLink="quizzes" linkText="Quizzes" />
          <LinkComponent pageLink="generatequiz" linkText="Generate Quiz" />
          <LinkComponent pageLink="quizhistory" linkText="History" />
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;

const LinkComponent = ({
  pageLink,
  linkText,
}: {
  pageLink: string;
  linkText: string;
}) => {
  return (
    <Link
      href={`/${pageLink}`}
      className=" flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
      <span className="mx-2 text-md">{linkText}</span>
    </Link>
  );
};
