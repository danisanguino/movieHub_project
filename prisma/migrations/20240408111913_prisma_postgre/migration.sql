/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Genres` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_movieId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Genres_title_key" ON "Genres"("title");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
