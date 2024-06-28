/*
  Warnings:

  - Changed the type of `type` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "type",
ADD COLUMN     "type" "PetType" NOT NULL;
