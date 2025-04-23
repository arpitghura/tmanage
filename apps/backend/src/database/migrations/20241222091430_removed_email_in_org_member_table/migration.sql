/*
  Warnings:

  - You are about to drop the column `email` on the `OrganizationMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrganizationMember" DROP CONSTRAINT "OrganizationMember_userId_email_fkey";

-- AlterTable
ALTER TABLE "OrganizationMember" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
