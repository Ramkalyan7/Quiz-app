import { QuizQuestionType } from "@repo/common";
import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";

const AttempQuizPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const quiz = await prisma.quiz.findFirst({
    where: {
      id: Number(id),
    },
  });

  if(!quiz){
    redirect("/")
  }
  
  let questions: QuizQuestionType[];

  if (typeof quiz?.quizData === "string") {
    const temp = quiz.quizData as string;
    questions = JSON.parse(temp) as QuizQuestionType[];
  } else {
     questions=[];
     redirect("/")
  }


  return (
    <div className="px-10">
      <HeaderText questions={questions} title={quiz?.title || ""} />
      <div className="py-10 pl-10"></div>
    </div>
  );
};

export default  AttempQuizPage;




const HeaderText = ({ title , questions}: { title: string,questions:QuizQuestionType[] }) => {
  return (
    <div>
      <div className="text-3xl font-semibold py-5">Start Your Quiz</div>
      <div className="pb-5">
        <div>{title.split(".")[0]}.</div>
      </div>
      {questions.map((question)=><QuizItem key={question.question} question={question}/>)}
    </div>
  );
};



const QuizItem = ({question}:{question:QuizQuestionType}) => {
  return (
    <div className="my-7">
      <div className="font-semibold">
        {question.question}
      </div>
      <div>
        {question.options.map((option)=><QuizOption key={option} option={option}/>)}
        
      </div>
    </div>
  );
};


const QuizOption = ({option}:{option:string}) => {
  return (
    <div className="pl-3 py-1 cursor-pointer">
      {option}
    </div>
  );
};
