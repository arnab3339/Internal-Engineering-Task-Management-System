/*
  Warnings:

  - You are about to drop the column `owner_id` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_owner_id_fkey`;

-- DropIndex
DROP INDEX `tasks_owner_id_fkey` ON `tasks`;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `owner_id`,
    ADD COLUMN `acceptance_criteria` TEXT NULL,
    ADD COLUMN `completed_at` DATETIME(3) NULL,
    ADD COLUMN `created_by` BIGINT NOT NULL,
    MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'CHANGES_REQUESTED', 'COMPLETED') NOT NULL DEFAULT 'TODO',
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM';

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
