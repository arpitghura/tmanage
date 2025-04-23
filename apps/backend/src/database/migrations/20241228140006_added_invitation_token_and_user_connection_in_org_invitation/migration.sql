/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `OrganizationInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "invitation_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvitation_email_key" ON "OrganizationInvitation"("email");

-- AddForeignKey
ALTER TABLE "OrganizationInvitation" ADD CONSTRAINT "OrganizationInvitation_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
