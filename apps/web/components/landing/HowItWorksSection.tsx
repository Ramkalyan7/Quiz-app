interface StepCardProps {
  number: number;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}

function StepCard({
  number,
  title,
  description,
  gradientFrom,
  gradientTo,
  borderColor,
}: StepCardProps) {
  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300`}
      ></div>
      <div
        className={`relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-${borderColor} transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-bold text-xl mb-6`}
        >
          {number}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create or Join",
      description:
        "Create a new quiz on any topic or join a friend's room using their unique code. Just 6 characters!",
      gradientFrom: "from-blue-500",
      gradientTo: "to-purple-600",
      borderColor: "blue-400",
    },
    {
      number: 2,
      title: "Answer Together",
      description:
        "See the same questions at the same time with a 30-second timer. Speed and accuracy both matter!",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-600",
      borderColor: "purple-400",
    },
    {
      number: 3,
      title: "See Live Results",
      description:
        "Watch the leaderboard update in real-time as answers are submitted. The fastest wins! 🏅",
      gradientFrom: "from-pink-500",
      gradientTo: "to-red-600",
      borderColor: "pink-400",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works in 3 Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
