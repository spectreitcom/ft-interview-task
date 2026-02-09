/*
  Warnings:

  - You are about to drop the `ProcessedImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProcessedImage" DROP CONSTRAINT "ProcessedImage_imageId_fkey";

-- DropTable
DROP TABLE "ProcessedImage";

-- CreateTable
CREATE TABLE "processed_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "processed_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "processed_images_id_key" ON "processed_images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "processed_images_imageId_key" ON "processed_images"("imageId");

-- AddForeignKey
ALTER TABLE "processed_images" ADD CONSTRAINT "processed_images_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
