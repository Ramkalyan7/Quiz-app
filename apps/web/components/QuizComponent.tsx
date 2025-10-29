import Link from "next/link";

 const QuizComponent = ({
  id,
  title,
  tags,
}: {
  id: number;
  title: string;
  tags: string[];
}) => {

  return (
    <Link href={`/attemptquiz/${id}`}>
    <div className="max-w-lg p-6 my-3 bg-gray-200 border-2 border-gray-300 rounded-lg shadow-sm cursor-pointer">
      <p className="mb-3 font-normal text-gray-700 ">{title.length>30 ? `${title.substring(0,150)} . . . . .` : title}</p>
      <div
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Start Quiz
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </div>
      <div className="pt-3">
        {tags.map((tag) => {
          return (
            <span key={tag} className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm  ">
             {tag}
            </span>
          );
        })}
      </div>
    </div>
    </Link>
  );
};

export default QuizComponent;