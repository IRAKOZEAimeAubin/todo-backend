/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Todo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Todo_todoId_key";

-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
DROP COLUMN "id",
ADD COLUMN     "published" BOOLEAN,
ADD COLUMN     "userId" TEXT,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("todoId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
