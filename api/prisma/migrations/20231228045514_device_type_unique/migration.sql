/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `DeviceType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_type_key" ON "DeviceType"("type");
