/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `OrganizationMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationMember" DROP CONSTRAINT "OrganizationMember_userId_fkey";

-- AlterTable
ALTER TABLE "OrganizationMember" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_key" ON "User"("id", "email");

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_userId_email_fkey" FOREIGN KEY ("userId", "email") REFERENCES "User"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
