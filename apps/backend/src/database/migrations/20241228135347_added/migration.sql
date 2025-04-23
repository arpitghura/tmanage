-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_accept_invitation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_invited" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_not_allowed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_su_user" BOOLEAN NOT NULL DEFAULT false;
