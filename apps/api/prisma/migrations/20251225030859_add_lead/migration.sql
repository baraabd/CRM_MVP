-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "addressLine" TEXT NOT NULL,
    "primaryName" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "primaryEmail" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "ownerUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_ownerUserId_status_idx" ON "Lead"("ownerUserId", "status");

-- CreateIndex
CREATE INDEX "Lead_city_area_idx" ON "Lead"("city", "area");

-- CreateIndex
CREATE INDEX "Lead_primaryPhone_idx" ON "Lead"("primaryPhone");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
