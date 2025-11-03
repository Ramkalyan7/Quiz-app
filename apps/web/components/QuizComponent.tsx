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
  const percentage =
    totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;

  return (
    <Link href={`/attemptquiz/${id}`}>
      <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-400 overflow-hidden cursor-pointer group relative">
        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {isFromHistory && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-2 rounded-xl text-sm font-bold shadow-lg z-10">
            <div className="flex items-center gap-2">
              {score}/{totalScore}
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col h-full space-y-4">
          <div className="grow">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
              {title.length > 100 ? `${title.substring(0, 100)}...` : title}
            </h3>
          </div>

          <div className="space-y-4 flex flex-col-reverse">
            <button className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg group/btn">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {isFromHistory ? "Retake Quiz" : "Start Quiz"}
              <svg
                className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
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

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 py-3">
                {tags.slice(0, 4).map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all duration-200"
                    >
                      <svg
                        className="w-3 h-3 mr-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {tag}
                    </span>
                  );
                })}
                {tags.length > 4 && (
                  <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-300">
                    +{tags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizComponent;
