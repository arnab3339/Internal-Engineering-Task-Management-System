-- CreateTable
CREATE TABLE `task_assignments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `task_id` BIGINT NOT NULL,
    `developer_id` BIGINT NOT NULL,
    `assigned_by` BIGINT NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unassigned_at` DATETIME(3) NULL,
    `unassignment_reason_id` BIGINT NULL,
    `unassignmentNote` VARCHAR(500) NULL,
    `is_current` BOOLEAN NOT NULL,

    INDEX `task_assignments_developer_id_is_current_idx`(`developer_id`, `is_current`),
    INDEX `task_assignments_task_id_is_current_idx`(`task_id`, `is_current`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task_assignments` ADD CONSTRAINT `task_assignments_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_assignments` ADD CONSTRAINT `task_assignments_developer_id_fkey` FOREIGN KEY (`developer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_assignments` ADD CONSTRAINT `task_assignments_assigned_by_fkey` FOREIGN KEY (`assigned_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task_assignments` ADD CONSTRAINT `task_assignments_unassignment_reason_id_fkey` FOREIGN KEY (`unassignment_reason_id`) REFERENCES `unassignment_reasons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
