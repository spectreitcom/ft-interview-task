/*
  Warnings:

  - You are about to drop the column `objectKey` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `processed_images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[storageKey]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mimeType` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageKey` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "processed_images" DROP CONSTRAINT "processed_images_imageId_fkey";

-- DropIndex
DROP INDEX "images_objectKey_key";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "objectKey",
ADD COLUMN     "error" TEXT,
ADD COLUMN     "mimeType" VARCHAR(50) NOT NULL,
ADD COLUMN     "storageKey" TEXT NOT NULL;

-- DropTable
DROP TABLE "processed_images";

-- CreateIndex
CREATE UNIQUE INDEX "images_storageKey_key" ON "images"("storageKey");
