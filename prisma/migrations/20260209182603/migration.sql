/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `ProcessedImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProcessedImage_imageId_key" ON "ProcessedImage"("imageId");
