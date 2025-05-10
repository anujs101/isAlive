-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "Website_url_key";

-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "pendingPayouts" INTEGER NOT NULL DEFAULT 0;
