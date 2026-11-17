/*
  Warnings:

  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "status",
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "year" TEXT;
