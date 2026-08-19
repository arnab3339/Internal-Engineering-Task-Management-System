-- DropForeignKey
ALTER TABLE `task_assignments` DROP FOREIGN KEY `task_assignments_developer_id_fkey`;

-- DropForeignKey
ALTER TABLE `task_assignments` DROP FOREIGN KEY `task_assignments_task_id_fkey`;

-- DropIndex
DROP INDEX `task_assignments_developer_id_is_current_idx` ON `task_assignments`;

-- DropIndex
DROP INDEX `task_assignments_task_id_is_current_idx` ON `task_assignments`;
