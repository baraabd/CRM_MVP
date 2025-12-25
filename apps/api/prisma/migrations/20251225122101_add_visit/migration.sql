-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "repUserId" TEXT NOT NULL,
    "checkInAt" TIMESTAMP(3),
    "checkInLat" DOUBLE PRECISION,
    "checkInLng" DOUBLE PRECISION,
    "checkOutAt" TIMESTAMP(3),
    "checkOutLat" DOUBLE PRECISION,
    "checkOutLng" DOUBLE PRECISION,
    "durationMinutes" INTEGER,
    "outcomeResult" TEXT,
    "refusalReason" TEXT,
    "formData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_leadId_repUserId_idx" ON "Visit"("leadId", "repUserId");

-- CreateIndex
CREATE INDEX "Visit_checkInAt_idx" ON "Visit"("checkInAt");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_repUserId_fkey" FOREIGN KEY ("repUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
