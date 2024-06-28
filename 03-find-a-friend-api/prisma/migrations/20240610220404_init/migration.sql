-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "address" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "city" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'ORGANIZATION',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "energy" INTEGER NOT NULL,
    "size" "Size" NOT NULL,
    "environment" "Size" NOT NULL,
    "dependency" "Intensity" NOT NULL,
    "age" INTEGER NOT NULL,
    "pictures" TEXT[],
    "adoption_requirements" TEXT[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
