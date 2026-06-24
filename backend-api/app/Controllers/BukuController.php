<?php

namespace App\Controllers;

use App\Models\BukuModel;
use CodeIgniter\RESTful\ResourceController;

class BukuController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new BukuModel();
    }

    // ─── GET /buku ─────────────────────────────────────────────────────────────
    public function index()
    {
        return $this->respond([
            'status' => 'success',
            'data'   => $this->model->getAllWithRelations(),
        ]);
    }

    // ─── GET /buku/{id} ────────────────────────────────────────────────────────
    public function show($id = null)
    {
        $data = $this->model->getWithRelations((int) $id);
        if (!$data) return $this->failNotFound('Buku tidak ditemukan.');
        return $this->respond(['status' => 'success', 'data' => $data]);
    }

    // ─── POST /buku ────────────────────────────────────────────────────────────
    public function create()
    {
        $rules = [
            'judul'      => 'required|min_length[2]|max_length[255]',
            'genre_id'   => 'required|integer',
            'penulis_id' => 'required|integer',
            'stok'       => 'required|integer|greater_than_equal_to[0]',
        ];
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'judul'        => $this->request->getVar('judul'),
            'genre_id'     => $this->request->getVar('genre_id'),
            'penulis_id'   => $this->request->getVar('penulis_id'),
            'tahun_terbit' => $this->request->getVar('tahun_terbit'),
            'stok'         => $this->request->getVar('stok'),
            'sinopsis'     => $this->request->getVar('sinopsis'),
        ]);

        return $this->respondCreated([
            'status'  => 'success',
            'message' => 'Buku berhasil ditambahkan.',
            'id'      => $id,
        ]);
    }

    // ─── PUT /buku/{id} ────────────────────────────────────────────────────────
    public function update($id = null)
    {
        $buku = $this->model->find($id);
        if (!$buku) return $this->failNotFound('Buku tidak ditemukan.');

        // Baca langsung dari php://input karena CI4 kadang gagal parse JSON di PUT
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $this->model->update($id, [
            'judul'        => $data['judul']        ?? $buku['judul'],
            'genre_id'     => $data['genre_id']     ?? $buku['genre_id'],
            'penulis_id'   => $data['penulis_id']   ?? $buku['penulis_id'],
            'tahun_terbit' => $data['tahun_terbit'] ?? $buku['tahun_terbit'],
            'stok'         => $data['stok']         ?? $buku['stok'],
            'sinopsis'     => $data['sinopsis']     ?? $buku['sinopsis'],
        ]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Buku berhasil diperbarui.',
        ]);
    }

    // ─── DELETE /buku/{id} ─────────────────────────────────────────────────────
    public function delete($id = null)
    {
        if (!$this->model->find($id)) return $this->failNotFound('Buku tidak ditemukan.');
        $this->model->delete($id);
        return $this->respondDeleted([
            'status'  => 'success',
            'message' => 'Buku berhasil dihapus.',
        ]);
    }
}