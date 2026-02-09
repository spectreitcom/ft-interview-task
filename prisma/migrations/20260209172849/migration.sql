/*
  Warnings:

  - A unique constraint covering the columns `[storageKey]` on the table `image_read` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storageKey` to the `image_read` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image_read" ADD COLUMN     "storageKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "image_read_storageKey_key" ON "image_read"("storageKey");
