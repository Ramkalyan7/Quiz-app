interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

function FeatureCard({ icon, title, description, bgColor }: FeatureProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${bgColor}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
      title: "AI-Generated Questions",
      description:
        "Just describe the topic and our AI creates 10 perfect questions instantly.",
      bgColor: "bg-green-100",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600"
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
      title: "Competitive Fun",
      description:
        "Real-time scoring rewards both speed and accuracy. Who will be champion?",
      bgColor: "bg-emerald-100",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      title: "Easy to Share",
      description:
        "Just share a 6-character room code. Your friends can join instantly via text or link.",
      bgColor: "bg-teal-100",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
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
      title: "Live Leaderboard",
      description:
        "Watch your ranking change with every correct answer. The competition is fierce!",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12 lg:mb-16">
          Why You'll Love It
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
