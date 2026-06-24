<?php

namespace App\Controllers;

use App\Models\PeminjamanModel;
use CodeIgniter\RESTful\ResourceController;

class PeminjamanController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new PeminjamanModel();
    }

    // ─── GET /peminjaman ───────────────────────────────────────────────────────
    public function index()
    {
        return $this->respond([
            'status' => 'success',
            'data'   => $this->model->getAllWithRelations(),
        ]);
    }

    // ─── GET /peminjaman/{id} ──────────────────────────────────────────────────
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Data peminjaman tidak ditemukan.');
        return $this->respond(['status' => 'success', 'data' => $data]);
    }

    // ─── POST /peminjaman ──────────────────────────────────────────────────────
    public function create()
    {
        $rules = [
            'buku_id'     => 'required|integer',
            'anggota_id'  => 'required|integer',
            'tgl_pinjam'  => 'required|valid_date',
            'tgl_kembali' => 'required|valid_date',
        ];
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'buku_id'     => $this->request->getVar('buku_id'),
            'anggota_id'  => $this->request->getVar('anggota_id'),
            'tgl_pinjam'  => $this->request->getVar('tgl_pinjam'),
            'tgl_kembali' => $this->request->getVar('tgl_kembali'),
            'status'      => 'dipinjam',
            'catatan'     => $this->request->getVar('catatan'),
        ]);

        return $this->respondCreated([
            'status'  => 'success',
            'message' => 'Peminjaman berhasil dicatat.',
            'id'      => $id,
        ]);
    }

    // ─── PUT /peminjaman/{id} ──────────────────────────────────────────────────
    public function update($id = null)
    {
        $pinjam = $this->model->find($id);
        if (!$pinjam) return $this->failNotFound('Data peminjaman tidak ditemukan.');

        // Baca langsung dari php://input
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $this->model->update($id, [
            'tgl_kembali_aktual' => $data['tgl_kembali_aktual'] ?? $pinjam['tgl_kembali_aktual'],
            'status'             => $data['status']             ?? $pinjam['status'],
            'catatan'            => $data['catatan']            ?? $pinjam['catatan'],
        ]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Peminjaman berhasil diperbarui.',
        ]);
    }

    // ─── DELETE /peminjaman/{id} ───────────────────────────────────────────────
    public function delete($id = null)
    {
        if (!$this->model->find($id)) return $this->failNotFound('Data peminjaman tidak ditemukan.');
        $this->model->delete($id);
        return $this->respondDeleted([
            'status'  => 'success',
            'message' => 'Data peminjaman berhasil dihapus.',
        ]);
    }
}