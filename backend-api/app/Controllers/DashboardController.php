<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class DashboardController extends ResourceController
{
    protected $format = 'json';

    // ─── GET /dashboard/stats ──────────────────────────────────────────────────
    // Endpoint publik — tidak perlu login, dipakai di landing page
    public function stats()
    {
        $db = \Config\Database::connect();

        $totalBuku       = $db->table('buku')->countAllResults();
        $totalAnggota    = $db->table('anggota')->countAllResults();
        $totalPeminjaman = $db->table('peminjaman')->countAllResults();
        $sedangDipinjam  = $db->table('peminjaman')->where('status', 'dipinjam')->countAllResults();
        $totalGenre      = $db->table('genre')->countAllResults();

        return $this->respond([
            'status' => 'success',
            'data'   => [
                'total_buku'       => $totalBuku,
                'total_anggota'    => $totalAnggota,
                'total_peminjaman' => $totalPeminjaman,
                'sedang_dipinjam'  => $sedangDipinjam,
                'total_genre'      => $totalGenre,
            ],
        ]);
    }
}