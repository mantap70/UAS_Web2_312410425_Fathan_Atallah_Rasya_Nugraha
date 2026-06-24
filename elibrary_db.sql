-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Jun 2026 pada 11.04
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elibrary_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `anggota`
--

CREATE TABLE `anggota` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `anggota`
--

INSERT INTO `anggota` (`id`, `nama`, `email`, `telepon`, `alamat`, `created_at`, `updated_at`) VALUES
(1, 'Budi Santoso', 'budi@email.com', '081234567890', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(2, 'Siti Rahayu', 'siti@email.com', '082345678901', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(3, 'Dani Pratama', 'dani@email.com', '083456789012', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `buku`
--

CREATE TABLE `buku` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `penulis_id` int(11) NOT NULL,
  `tahun_terbit` year(4) DEFAULT NULL,
  `stok` int(11) DEFAULT 0,
  `sinopsis` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `buku`
--

INSERT INTO `buku` (`id`, `judul`, `genre_id`, `penulis_id`, `tahun_terbit`, `stok`, `sinopsis`, `created_at`, `updated_at`) VALUES
(1, 'Laskar Pelangi', 1, 1, '2005', 5, 'Kisah sepuluh anak Belitung yang berjuang meraih pendidikan di sekolah sederhana.', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(2, 'Bumi', 5, 2, '2014', 3, 'Petualangan Raib, Seli, dan Ali di dunia paralel penuh keajaiban.', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(3, 'One Piece Vol. 1', 3, 3, '1997', 8, 'Petualangan Monkey D. Luffy yang ingin menjadi Raja Bajak Laut.', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(4, 'Naruto Vol. 1', 3, 4, '1999', 6, 'Kisah ninja muda Naruto Uzumaki dari Desa Konoha.', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(5, 'Harry Potter Vol. 1', 5, 5, '1997', 4, 'Seorang anak yatim yang ternyata adalah penyihir terkenal.', '2026-06-23 01:09:54', '2026-06-23 01:09:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `nama_genre` varchar(100) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `genre`
--

INSERT INTO `genre` (`id`, `nama_genre`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'Novel', 'Karya fiksi panjang berbentuk prosa', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(2, 'Komik', 'Narasi bergambar dengan panel-panel cerita', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(3, 'Manga', 'Komik bergaya Jepang, dibaca dari kanan ke kiri', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(4, 'Sains Fiksi', 'Fiksi berbasis konsep ilmu pengetahuan dan teknologi', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(5, 'Fantasi', 'Fiksi dengan elemen magis dan dunia imajinatif', '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(6, 'Biografi', 'Kisah nyata kehidupan seseorang', '2026-06-23 01:09:54', '2026-06-23 01:09:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `buku_id` int(11) NOT NULL,
  `anggota_id` int(11) NOT NULL,
  `tgl_pinjam` date NOT NULL,
  `tgl_kembali` date NOT NULL,
  `tgl_kembali_aktual` date DEFAULT NULL,
  `status` enum('dipinjam','dikembalikan','terlambat') DEFAULT 'dipinjam',
  `catatan` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjaman`
--

INSERT INTO `peminjaman` (`id`, `buku_id`, `anggota_id`, `tgl_pinjam`, `tgl_kembali`, `tgl_kembali_aktual`, `status`, `catatan`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-06-01', '2025-06-14', NULL, 'dikembalikan', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(2, 3, 2, '2025-06-10', '2025-06-24', NULL, 'dipinjam', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(4, 2, 3, '2026-05-22', '2026-05-27', '0000-00-00', 'dipinjam', '', '2026-06-23 03:17:36', '2026-06-23 08:00:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penulis`
--

CREATE TABLE `penulis` (
  `id` int(11) NOT NULL,
  `nama_penulis` varchar(150) NOT NULL,
  `nama_penerbit` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penulis`
--

INSERT INTO `penulis` (`id`, `nama_penulis`, `nama_penerbit`, `email`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'Andrea Hirata', 'Bentang Pustaka', 'andrea@bentang.com', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(2, 'Tere Liye', 'Gramedia', 'tere@gramedia.com', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(3, 'Eiichiro Oda', 'Shueisha', 'oda@shueisha.jp', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(4, 'Masashi Kishimoto', 'Shueisha', 'kishimoto@shueisha.jp', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54'),
(5, 'J.K. Rowling', 'Bloomsbury', 'jk@bloomsbury.com', NULL, '2026-06-23 01:09:54', '2026-06-23 01:09:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'admin',
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@elibrary.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'dc9594e3b7eb27d456f122588cef5ef1b35edaec416be6398672e089d1879377', '2026-06-23 01:09:54', '2026-06-23 03:13:31');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `penulis_id` (`penulis_id`);

--
-- Indeks untuk tabel `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `buku_id` (`buku_id`),
  ADD KEY `anggota_id` (`anggota_id`);

--
-- Indeks untuk tabel `penulis`
--
ALTER TABLE `penulis`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `buku`
--
ALTER TABLE `buku`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `penulis`
--
ALTER TABLE `penulis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `buku`
--
ALTER TABLE `buku`
  ADD CONSTRAINT `buku_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `buku_ibfk_2` FOREIGN KEY (`penulis_id`) REFERENCES `penulis` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`buku_id`) REFERENCES `buku` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_2` FOREIGN KEY (`anggota_id`) REFERENCES `anggota` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
