interface PlayerProps {
  name: string;
  placement: string;
  points: number;
  color: string;
  answers: Array<{
    question: string;
    status: "correct" | "incorrect" | "pending";
  }>;
}

function PlayerCard({ name, placement, points, color, answers }: PlayerProps) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${color}`}
        ></div>
        <div className="text-left min-w-0">
          <p className="font-bold text-white text-sm sm:text-base truncate">
            {name}
          </p>
          <p className="text-xs sm:text-sm opacity-75 text-white truncate">
            {placement} - {points} pts
          </p>
        </div>
      </div>
      <div className="space-y-1.5 sm:space-y-2 text-left text-xs sm:text-sm text-white">
        {answers.map((answer, idx) => (
          <div key={idx} className="flex items-start gap-1.5 sm:gap-2 truncate">
            <span
              className={`flex-shrink-0 ${
                answer.status === "correct"
                  ? "text-green-400"
                  : answer.status === "incorrect"
                    ? "text-red-400"
                    : "opacity-50"
              }`}
            >
              {answer.status === "correct"
                ? "✓"
                : answer.status === "incorrect"
                  ? "✗"
                  : "-"}
            </span>
            <span className="truncate">{answer.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveDemoSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center text-white space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          See Multiplayer in Action
        </h2>
        <p className="text-base sm:text-lg lg:text-xl opacity-90">
          Watch as two players compete on the same quiz in real-time
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <PlayerCard
            name="You"
            placement="1st Place"
            points={45}
            color="from-blue-400 to-blue-600"
            answers={[
              { question: "Question 1", status: "correct" },
              { question: "Question 2", status: "correct" },
              { question: "Question 3", status: "pending" },
            ]}
          />
          <PlayerCard
            name="Friend"
            placement="2nd Place"
            points={38}
            color="from-purple-400 to-purple-600"
            answers={[
              { question: "Question 1", status: "correct" },
              { question: "Question 2", status: "incorrect" },
              { question: "Question 3", status: "pending" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
