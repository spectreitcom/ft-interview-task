-- CreateEnum
CREATE TYPE "ImageStatus" AS ENUM ('PROCESSING', 'PROCESSED', 'FAILED');

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "storageKey" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "status" "ImageStatus" NOT NULL DEFAULT 'PROCESSED',

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_read" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "image_read_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_storageKey_key" ON "images"("storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "image_read_id_key" ON "image_read"("id");

-- CreateIndex
CREATE UNIQUE INDEX "image_read_imageId_key" ON "image_read"("imageId");

-- CreateIndex
CREATE INDEX "image_read_title_idx" ON "image_read"("title");

-- CreateIndex
CREATE INDEX "image_read_imageId_idx" ON "image_read"("imageId");
