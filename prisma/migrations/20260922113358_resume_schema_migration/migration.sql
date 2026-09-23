/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Resume` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SuggestionPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropIndex
DROP INDEX "Resume_userId_idx";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "createdAt",
ADD COLUMN     "atsScore" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "resumeScore" INTEGER,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ResumeKeyword" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "matched" BOOLEAN NOT NULL,

    CONSTRAINT "ResumeKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkillGap" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "importance" "SuggestionPriority" NOT NULL,
    "note" TEXT,

    CONSTRAINT "ResumeSkillGap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSuggestion" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "priority" "SuggestionPriority" NOT NULL,

    CONSTRAINT "ResumeSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResumeKeyword_resumeId_idx" ON "ResumeKeyword"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeSkillGap_resumeId_idx" ON "ResumeSkillGap"("resumeId");

-- CreateIndex
CREATE INDEX "ResumeSuggestion_resumeId_idx" ON "ResumeSuggestion"("resumeId");

-- CreateIndex
CREATE INDEX "Resume_userId_isActive_idx" ON "Resume"("userId", "isActive");

-- AddForeignKey
ALTER TABLE "ResumeKeyword" ADD CONSTRAINT "ResumeKeyword_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkillGap" ADD CONSTRAINT "ResumeSkillGap_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSuggestion" ADD CONSTRAINT "ResumeSuggestion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
