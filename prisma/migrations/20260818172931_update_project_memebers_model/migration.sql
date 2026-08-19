-- DropForeignKey
ALTER TABLE `project_members` DROP FOREIGN KEY `project_members_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `project_members` DROP FOREIGN KEY `project_members_user_id_fkey`;

-- DropIndex
DROP INDEX `project_members_project_id_fkey` ON `project_members`;

-- DropIndex
DROP INDEX `project_members_user_id_fkey` ON `project_members`;

-- AddForeignKey
ALTER TABLE `project_members` ADD CONSTRAINT `project_members_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_members` ADD CONSTRAINT `project_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
