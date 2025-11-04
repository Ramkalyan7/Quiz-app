import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600">
          Whether you want to learn alone or compete with friends, Quiz Up has
          you covered. Choose your path!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/login">
            <button className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer">
              Create Quiz Now
            </button>
          </Link>
          <Link href="/login">
            <button className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-purple-600 hover:text-purple-600 transition-all duration-300 cursor-pointer">
              Browse Quizzes
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
