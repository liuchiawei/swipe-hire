/*
  Warnings:

  - You are about to drop the column `company_id` on the `viewed` table. All the data in the column will be lost.
  - You are about to drop the `collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jobs_id` to the `viewed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collection` DROP FOREIGN KEY `collection_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `collection` DROP FOREIGN KEY `collection_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `viewed` DROP FOREIGN KEY `viewed_company_id_fkey`;

-- DropIndex
DROP INDEX `viewed_company_id_fkey` ON `viewed`;

-- AlterTable
ALTER TABLE `resume` MODIFY `bio` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `viewed` DROP COLUMN `company_id`,
    ADD COLUMN `jobs_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `collection`;

-- DropTable
DROP TABLE `company`;

-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `requirement` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collected` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `jobs_id` INTEGER NOT NULL,
    `collected_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uncollected` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `jobs_id` INTEGER NOT NULL,
    `uncollected_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `viewed` ADD CONSTRAINT `viewed_jobs_id_fkey` FOREIGN KEY (`jobs_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collected` ADD CONSTRAINT `collected_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collected` ADD CONSTRAINT `collected_jobs_id_fkey` FOREIGN KEY (`jobs_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uncollected` ADD CONSTRAINT `uncollected_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uncollected` ADD CONSTRAINT `uncollected_jobs_id_fkey` FOREIGN KEY (`jobs_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
