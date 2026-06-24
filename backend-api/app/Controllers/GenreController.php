<?php

namespace App\Controllers;

use App\Models\GenreModel;
use CodeIgniter\RESTful\ResourceController;

class GenreController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new GenreModel();
    }

    // ─── GET /genre ────────────────────────────────────────────────────────────
    public function index()
    {
        return $this->respond([
            'status' => 'success',
            'data'   => $this->model->findAll(),
        ]);
    }

    // ─── POST /genre ───────────────────────────────────────────────────────────
    public function create()
    {
        $rules = ['nama_genre' => 'required|min_length[2]|max_length[100]'];
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'nama_genre' => $this->request->getVar('nama_genre'),
            'deskripsi'  => $this->request->getVar('deskripsi'),
        ]);

        return $this->respondCreated([
            'status'  => 'success',
            'message' => 'Genre berhasil ditambahkan.',
            'id'      => $id,
        ]);
    }

    // ─── PUT /genre/{id} ───────────────────────────────────────────────────────
    public function update($id = null)
    {
        $genre = $this->model->find($id);
        if (!$genre) return $this->failNotFound('Genre tidak ditemukan.');

        // Baca langsung dari php://input
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $this->model->update($id, [
            'nama_genre' => $data['nama_genre'] ?? $genre['nama_genre'],
            'deskripsi'  => $data['deskripsi']  ?? $genre['deskripsi'],
        ]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Genre berhasil diperbarui.',
        ]);
    }

    // ─── DELETE /genre/{id} ────────────────────────────────────────────────────
    public function delete($id = null)
    {
        if (!$this->model->find($id)) return $this->failNotFound('Genre tidak ditemukan.');
        $this->model->delete($id);
        return $this->respondDeleted([
            'status'  => 'success',
            'message' => 'Genre berhasil dihapus.',
        ]);
    }
}