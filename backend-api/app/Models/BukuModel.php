<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table         = 'buku';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['judul', 'genre_id', 'penulis_id', 'tahun_terbit', 'stok', 'sinopsis'];
    protected $useTimestamps = true;

    /**
     * Ambil semua buku beserta nama genre dan nama penulis
     * (JOIN 3 tabel sekaligus)
     */
    public function getAllWithRelations()
    {
        return $this
            ->select('buku.*, genre.nama_genre, penulis.nama_penulis, penulis.nama_penerbit')
            ->join('genre',   'genre.id = buku.genre_id')
            ->join('penulis', 'penulis.id = buku.penulis_id')
            ->findAll();
    }

    /**
     * Ambil satu buku berdasarkan ID, beserta relasi
     */
    public function getWithRelations(int $id)
    {
        return $this
            ->select('buku.*, genre.nama_genre, penulis.nama_penulis, penulis.nama_penerbit')
            ->join('genre',   'genre.id = buku.genre_id')
            ->join('penulis', 'penulis.id = buku.penulis_id')
            ->find($id);
    }
}