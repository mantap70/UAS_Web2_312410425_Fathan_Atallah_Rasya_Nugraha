<?php

namespace App\Controllers;

use App\Models\AnggotaModel;
use CodeIgniter\RESTful\ResourceController;

class AnggotaController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new AnggotaModel();
    }

    // ─── GET /anggota ──────────────────────────────────────────────────────────
    public function index()
    {
        return $this->respond([
            'status' => 'success',
            'data'   => $this->model->findAll(),
        ]);
    }

    // ─── GET /anggota/{id} ─────────────────────────────────────────────────────
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->failNotFound('Anggota tidak ditemukan.');
        return $this->respond(['status' => 'success', 'data' => $data]);
    }

    // ─── POST /anggota ─────────────────────────────────────────────────────────
    public function create()
    {
        $rules = [
            'nama'  => 'required|min_length[2]|max_length[150]',
            'email' => 'required|valid_email|is_unique[anggota.email]',
        ];
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'nama'    => $this->request->getVar('nama'),
            'email'   => $this->request->getVar('email'),
            'telepon' => $this->request->getVar('telepon'),
            'alamat'  => $this->request->getVar('alamat'),
        ]);

        return $this->respondCreated([
            'status'  => 'success',
            'message' => 'Anggota berhasil ditambahkan.',
            'id'      => $id,
        ]);
    }

    // ─── PUT /anggota/{id} ─────────────────────────────────────────────────────
    public function update($id = null)
    {
        $anggota = $this->model->find($id);
        if (!$anggota) return $this->failNotFound('Anggota tidak ditemukan.');

        // Baca langsung dari php://input
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        $this->model->update($id, [
            'nama'    => $data['nama']    ?? $anggota['nama'],
            'email'   => $data['email']   ?? $anggota['email'],
            'telepon' => $data['telepon'] ?? $anggota['telepon'],
            'alamat'  => $data['alamat']  ?? $anggota['alamat'],
        ]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Anggota berhasil diperbarui.',
        ]);
    }

    // ─── DELETE /anggota/{id} ──────────────────────────────────────────────────
    public function delete($id = null)
    {
        if (!$this->model->find($id)) return $this->failNotFound('Anggota tidak ditemukan.');
        $this->model->delete($id);
        return $this->respondDeleted([
            'status'  => 'success',
            'message' => 'Anggota berhasil dihapus.',
        ]);
    }
}