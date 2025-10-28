-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quizData" JSONB NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
