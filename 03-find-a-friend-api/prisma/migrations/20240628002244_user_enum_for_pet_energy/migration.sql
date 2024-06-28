/*
  Warnings:

  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('LOWEST', 'LOW', 'REGULAR', 'HIGH', 'HIGHEST');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy",
ADD COLUMN     "energy" "Energy" NOT NULL;
