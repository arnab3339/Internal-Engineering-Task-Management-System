-- CreateIndex
CREATE INDEX `project_members_project_id_user_id_removed_at_idx` ON `project_members`(`project_id`, `user_id`, `removed_at`);
