/*
  Warnings:

  - Made the column `imageId` on table `ProcessedImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProcessedImage" ALTER COLUMN "imageId" SET NOT NULL;
