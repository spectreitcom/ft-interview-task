/*
  Warnings:

  - You are about to drop the column `objectKey` on the `image_read` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "image_read_objectKey_key";

-- AlterTable
ALTER TABLE "image_read" DROP COLUMN "objectKey";

-- CreateTable
CREATE TABLE "ProcessedImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "imageId" TEXT,

    CONSTRAINT "ProcessedImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedImage_id_key" ON "ProcessedImage"("id");

-- AddForeignKey
ALTER TABLE "ProcessedImage" ADD CONSTRAINT "ProcessedImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
