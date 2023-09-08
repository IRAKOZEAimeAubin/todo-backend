/*
  Warnings:

  - You are about to drop the column `tags` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "tags",
DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
