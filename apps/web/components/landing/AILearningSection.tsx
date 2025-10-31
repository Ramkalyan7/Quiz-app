import Link from "next/link";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

function BenefitItem({ icon, title, description, bgColor }: BenefitProps) {
  return (
    <div className="flex gap-4">
      <div
        className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg ${bgColor}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function MockQuizInterface() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-20"></div>
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              JavaScript Fundamentals
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              Question 3 of 10
            </span>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-gray-900">
              What is the difference between let and const in JavaScript?
            </p>

            {/* Options */}
            <div className="space-y-3">
              <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200">
                <p className="text-gray-700">let and const are identical</p>
              </div>
              <div className="p-4 rounded-lg border-2 border-green-500 bg-green-50">
                <p className="text-gray-700 font-medium">
                  ✓ let is reassignable, const is not
                </p>
              </div>
              <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200">
                <p className="text-gray-700">
                  const is reassignable, let is not
                </p>
              </div>
              <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-all duration-200">
                <p className="text-gray-700">Neither can be reassigned</p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
            <p className="text-sm text-blue-900 font-semibold mb-2">
              💡 Explanation:
            </p>
            <p className="text-sm text-blue-800">
              let allows you to reassign values, while const prevents
              reassignment. Both are block-scoped, unlike var which is
              function-scoped.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-900">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AILearningSection() {
  const benefits = [
    {
      icon: (
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      title: "Personalized Learning",
      description: "Quizzes tailored to your exact learning goals and pace.",
      bgColor: "bg-green-100",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Instant Feedback",
      description:
        "See correct answers immediately with explanations for better retention.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Track Progress",
      description:
        "View your performance history and see improvements over time.",
      bgColor: "bg-purple-100",
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-pink-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Unlimited Topics",
      description: "Study anything from programming to history in minutes.",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                📚 Learning Mode
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Master Any Topic with
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                AI Quizzes
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Not feeling competitive? Create AI-powered quizzes just for
              learning. Get instant feedback on every answer and understand your
              knowledge gaps.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>

            <div className="pt-4">
              <Link href="/generatequiz">
                <button className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Learning Now
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <MockQuizInterface />
        </div>
      </div>
    </section>
  );
}
