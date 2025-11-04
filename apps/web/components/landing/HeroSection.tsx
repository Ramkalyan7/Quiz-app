import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-lg">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">
              New: Multiplayer Quizzes
            </span>
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Challenge Your
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Friends in Real-Time
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create AI-powered quizzes, share a room code, and compete with
            friends live. Winner takes all! 🎯
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/login">
            <button className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Quiz
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link href={"/login"}>
            <button className="group relative px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:text-purple-600 focus:ring-4 focus:ring-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="relative z-10 flex items-center justify-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Join Room
              </span>
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-12">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <div className="text-3xl font-bold text-blue-600">⚡</div>
            <p className="text-sm text-gray-600 mt-2">Real-Time</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <div className="text-3xl font-bold text-purple-600">🤖</div>
            <p className="text-sm text-gray-600 mt-2">AI-Powered</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-md">
            <div className="text-3xl font-bold text-pink-600">🏆</div>
            <p className="text-sm text-gray-600 mt-2">Competitive</p>
          </div>
        </div>
      </div>
    </section>
  );
}
