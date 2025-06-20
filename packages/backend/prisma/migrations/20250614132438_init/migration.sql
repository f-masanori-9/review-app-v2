/*
  Warnings:

  - You are about to drop the `GoogleAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoogleAccount" DROP CONSTRAINT "GoogleAccount_userId_fkey";

-- DropTable
DROP TABLE "GoogleAccount";

-- CreateTable
CREATE TABLE "Auth0User" (
    "sub" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Auth0ToUserRelation" (
    "id" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Auth0ToUserRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth0User_sub_key" ON "Auth0User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Auth0ToUserRelation_sub_key" ON "Auth0ToUserRelation"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "Auth0ToUserRelation_userId_key" ON "Auth0ToUserRelation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth0ToUserRelation_sub_userId_key" ON "Auth0ToUserRelation"("sub", "userId");

-- AddForeignKey
ALTER TABLE "Auth0ToUserRelation" ADD CONSTRAINT "Auth0ToUserRelation_sub_fkey" FOREIGN KEY ("sub") REFERENCES "Auth0User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth0ToUserRelation" ADD CONSTRAINT "Auth0ToUserRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
