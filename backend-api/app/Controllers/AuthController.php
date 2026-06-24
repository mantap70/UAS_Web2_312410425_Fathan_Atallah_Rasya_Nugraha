<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    protected $format = 'json';

    // ─── POST /auth/login ──────────────────────────────────────────────────────
    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $model = new UserModel();
        $user  = $model->where('email', $this->request->getVar('email'))->first();

        // Cek user ada dan password cocok
        if (!$user || !password_verify($this->request->getVar('password'), $user['password'])) {
            return $this->failUnauthorized('Email atau password salah.');
        }

        // Buat token acak lalu simpan ke database
        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status'  => 'success',
            'message' => 'Login berhasil.',
            'data'    => [
                'id'    => $user['id'],
                'nama'  => $user['nama'],
                'email' => $user['email'],
                'role'  => $user['role'],
                'token' => $token,
            ],
        ]);
    }

    // ─── POST /auth/logout ─────────────────────────────────────────────────────
    public function logout()
    {
        // Ambil token dari header
        $token = str_replace('Bearer ', '', $this->request->getHeaderLine('Authorization'));

        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if ($user) {
            // Hapus token dari database → sesi berakhir
            $model->update($user['id'], ['token' => null]);
        }

        return $this->respond([
            'status'  => 'success',
            'message' => 'Logout berhasil.',
        ]);
    }
}