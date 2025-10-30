import { prisma } from "../../../lib/prisma";
import QuizComponent from "../../../components/QuizComponent";
import { QuizWhereInput } from "../../../prisma/generated/prisma/models";
import PaginationBtns from "../../../components/quizzes/PaginationBtns";
import SearchInput from "../../../components/quizzes/SearchInput";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 4;

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const quizzes = async ({ searchParams }: Props) => {

  const { q, page } = await searchParams;
  const searchQuery = q?.toLowerCase().trim() || "";
  let currentPage = parseInt(page || "1");

  // Build WHERE clause
  const whereClause = searchQuery
    ? ({
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { tags: { hasSome: [searchQuery] } },
        ],
      } as QuizWhereInput)
    : ({} as QuizWhereInput);

  // Get total count for pagination
  const totalCount = await prisma.quiz.count({
    where: whereClause,
  });
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;

  // Fetch paginated quizzes
  const quizzes = await prisma.quiz.findMany({
    where: whereClause,
    take: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      tags: true,
      createdAt: true,
    },
  });

  return (
    <div className="px-5">
      <HeaderText />
      <div>
        <SearchInput />
      </div>
      <div className=" flex flex-row flex-wrap items-start justify-around">
        {quizzes?.map((quiz) => {
          return (
            <QuizComponent
              key={quiz.id}
              title={quiz.title}
              tags={quiz.tags}
              id={quiz.id}
            />
          );
        })}
      </div>
      <div>
        <PaginationBtns currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default quizzes;

const HeaderText = () => {
  return (
    <div className="text-center mb-10">
      <div className="mt-10 mb-5 text-4xl font-semibold ">Ready to Learn?</div>
      <div className="text-gray-700 ">
        Choose a quiz and start testing your knowledge
      </div>
    </div>
  );
};
