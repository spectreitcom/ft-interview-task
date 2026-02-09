/*
  Warnings:

  - You are about to drop the column `storageKey` on the `image_read` table. All the data in the column will be lost.
  - You are about to drop the column `storageKey` on the `images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[objectKey]` on the table `image_read` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[objectKey]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `objectKey` to the `image_read` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectKey` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "image_read_storageKey_key";

-- DropIndex
DROP INDEX "images_storageKey_key";

-- AlterTable
ALTER TABLE "image_read" DROP COLUMN "storageKey",
ADD COLUMN     "objectKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "images" DROP COLUMN "storageKey",
ADD COLUMN     "objectKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "image_read_objectKey_key" ON "image_read"("objectKey");

-- CreateIndex
CREATE UNIQUE INDEX "images_objectKey_key" ON "images"("objectKey");
