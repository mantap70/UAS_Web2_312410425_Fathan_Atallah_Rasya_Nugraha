<?php

namespace App\Controllers;

use App\Models\PenulisModel;
use CodeIgniter\RESTful\ResourceController;

class PenulisController extends ResourceController
{
    protected $format = 'json';
    protected $model;

    public function __construct()
    {
        $this->model = new PenulisModel();
    }

    // ─── GET /penulis ──────────────────────────────────────────────────────────
    public function index()
    {
        return $this->respond([
            'status' => 'success',
            'data'   => $this->model->findAll(),
        ]);
    }

    // ─── GET /penulis/{id} ─────────────────────────────────────────────────────
    public function show($id = null)
    {
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }

        return $this->respond([
            'status' => 'success',
            'data'   => $data,
        ]);
    }

    // ─── POST /penulis ─────────────────────────────────────────────────────────
    public function create()
    {
        $rules = [
            'nama_penulis' => 'required|min_length[2]|max_length[150]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $id = $this->model->insert([
            'nama_penulis'  => $this->request->getVar('nama_penulis'),
            'nama_penerbit' => $this->request->getVar('nama_penerbit'),
            'email'         => $this->request->getVar('email'),
            'bio'           => $this->request->getVar('bio'),
        ]);

        return $this->respondCreated([
            'status'  => 'success',
            'message' => 'Penulis berhasil ditambahkan.',
            'id'      => $id,
        ]);
    }

    // ─── PUT /penulis/{id} ─────────────────────────────────────────────────────
    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }

        $data = $this->request->getRawInput();

        $this->model->update($id, [
            'nama_penulis'  => $data['nama_penulis']  ?? null,
            'nama_penerbit' => $data['nama_penerbit'] ?? null,
            'email'         => $data['email']         ?? null,
            'bio'           => $data['bio']           ?? null,
        ]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Penulis berhasil diperbarui.',
        ]);
    }

    // ─── DELETE /penulis/{id} ──────────────────────────────────────────────────
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Penulis tidak ditemukan.');
        }

        $this->model->delete($id);

        return $this->respondDeleted([
            'status'  => 'success',
            'message' => 'Penulis berhasil dihapus.',
        ]);
    }
}