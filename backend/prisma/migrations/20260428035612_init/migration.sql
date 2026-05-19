-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `judul_ta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `bobot` DOUBLE NOT NULL,
    `jenis` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penilaian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswaId` INTEGER NOT NULL,
    `kriteriaId` INTEGER NOT NULL,
    `nilai` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_kriteriaId_fkey` FOREIGN KEY (`kriteriaId`) REFERENCES `Kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
