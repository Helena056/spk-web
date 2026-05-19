-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_kriteriaId_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_mahasiswaId_fkey`;

-- CreateTable
CREATE TABLE `HasilSAW` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mahasiswaId` INTEGER NOT NULL,
    `nilaiAkhir` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `HasilSAW_mahasiswaId_key`(`mahasiswaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_kriteriaId_fkey` FOREIGN KEY (`kriteriaId`) REFERENCES `Kriteria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasilSAW` ADD CONSTRAINT `HasilSAW_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
