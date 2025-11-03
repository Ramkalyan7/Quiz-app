import { prisma } from "../../../lib/prisma";
import QuizComponent from "../../../components/QuizComponent";
import { QuizWhereInput } from "../../../prisma/generated/prisma/models";
import PaginationBtns from "../../../components/quizzes/PaginationBtns";
import SearchInput from "../../../components/quizzes/SearchInput";

const ITEMS_PER_PAGE = 8;

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
  if (currentPage > totalPages && totalPages>0) currentPage = totalPages;

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-10 pb-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <HeaderText />
        <SearchInput />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <PaginationBtns currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default quizzes;

const HeaderText = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center gap-3">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Ready to Learn?
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Choose a quiz and start testing your knowledge
      </p>
    </div>
  );
};
