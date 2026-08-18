/*
  Warnings:

  - You are about to drop the column `due_date` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `due_date`,
    ADD COLUMN `deadline` DATETIME(3) NULL;
