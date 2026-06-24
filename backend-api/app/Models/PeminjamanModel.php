<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table         = 'peminjaman';
    protected $primaryKey    = 'id';
    protected $allowedFields = [
        'buku_id', 'anggota_id', 'tgl_pinjam', 'tgl_kembali',
        'tgl_kembali_aktual', 'status', 'catatan'
    ];
    protected $useTimestamps = true;

    /**
     * Ambil semua peminjaman beserta judul buku dan nama anggota
     */
    public function getAllWithRelations()
    {
        return $this
            ->select('peminjaman.*, buku.judul AS judul_buku, anggota.nama AS nama_anggota')
            ->join('buku',    'buku.id = peminjaman.buku_id')
            ->join('anggota', 'anggota.id = peminjaman.anggota_id')
            ->orderBy('peminjaman.created_at', 'DESC')
            ->findAll();
    }
}