import { QuizQuestionType } from "@repo/common";

const HeaderText = ({
  title,
  questions,
}: {
  title: string;
  questions: QuizQuestionType[];
}) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Start Your Quiz
        </h1>
      </div>
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="font-medium">{title.split(".")[0]}.</p>
      </div>
      <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500 bg-green-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-green-100">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">{questions.length} questions total</span>
      </div>
    </div>
  );
};

export default HeaderText;
