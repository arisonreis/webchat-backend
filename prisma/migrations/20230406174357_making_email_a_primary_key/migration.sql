/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserCreated` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCreated_email_key" ON "UserCreated"("email");
