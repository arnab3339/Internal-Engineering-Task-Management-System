-- CreateTable
CREATE TABLE `unassignment_reasons` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(100) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `affects_performance` BOOLEAN NOT NULL,

    UNIQUE INDEX `unassignment_reasons_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
