-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "image_publicId" TEXT,
ALTER COLUMN "score" DROP NOT NULL;
