/*
  Warnings:

  - You are about to alter the column `status` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(1))`.
  - You are about to alter the column `priority` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'TODO',
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'MEDIUM';
