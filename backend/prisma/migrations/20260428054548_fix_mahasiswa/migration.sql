/*
  Warnings:

  - You are about to alter the column `jenis` on the `kriteria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[nim]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nim` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kriteria` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `jenis` ENUM('BENEFIT', 'COST') NOT NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `nim` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `penilaian` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `role` ENUM('ADMIN', 'DOSEN', 'MAHASISWA') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Mahasiswa_nim_key` ON `Mahasiswa`(`nim`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
