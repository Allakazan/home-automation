/*
  Warnings:

  - The values [TOGGLE] on the enum `DeviceTypeActionInput` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeviceTypeActionInput_new" AS ENUM ('TEXT', 'NUMBER', 'FLOAT', 'SLIDER', 'CALENDAR', 'COLOR_WHEEL', 'TEMPERATURE');
ALTER TABLE "DeviceTypeAction" ALTER COLUMN "input" TYPE "DeviceTypeActionInput_new"[] USING ("input"::text::"DeviceTypeActionInput_new"[]);
ALTER TYPE "DeviceTypeActionInput" RENAME TO "DeviceTypeActionInput_old";
ALTER TYPE "DeviceTypeActionInput_new" RENAME TO "DeviceTypeActionInput";
DROP TYPE "DeviceTypeActionInput_old";
COMMIT;
