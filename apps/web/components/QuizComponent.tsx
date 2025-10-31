import Link from "next/link";

const QuizComponent = ({
  id,
  title,
  tags,
  isFromHistory = false,
  totalScore = 0,
  score = 0,
}: {
  id: number;
  title: string;
  tags: string[];
  isFromHistory?: boolean;
  totalScore?: number;
  score?: number;
}) => {
  return (
    <Link href={`/attemptquiz/${id}`}>
      <div className="h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400 overflow-hidden cursor-pointer group relative">
        <div className="h-1 bg-linear-to-r from-blue-500 to-purple-600"></div>

        {isFromHistory && (
          <div className="absolute top-4 right-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {score}/{totalScore}
          </div>
        )}

        <div className="p-6 flex flex-col h-full space-y-4">
          <div className="grow">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors duration-200">
              {title.length > 100 ? `${title.substring(0, 100)}...` : title}
            </h3>
          </div>

          <div className="space-y-4 flex flex-col-reverse">
            <button className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-400 to-indigo-500 rounded-lg hover:from-indigo-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group/btn">
              Start Quiz
              <svg
                className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
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
            </button>

            <div className="flex flex-wrap gap-2 py-5">
              {tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200 hover:border-blue-300 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizComponent;
