<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

/**
 * AuthFilter
 * Memproteksi endpoint — hanya bisa diakses jika ada Bearer Token valid
 */
class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        // Cek apakah header Authorization ada dan formatnya Bearer
        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'  => 'error',
                    'message' => 'Token tidak ditemukan. Akses ditolak.',
                ]);
        }

        // Ambil token, buang kata "Bearer "
        $token = trim(str_replace('Bearer ', '', $authHeader));

        // Cek token ke database
        $userModel = new UserModel();
        $user      = $userModel->where('token', $token)->first();

        if (!$user) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status'  => 'error',
                    'message' => 'Token tidak valid atau sesi telah berakhir.',
                ]);
        }

        // Token valid → lanjutkan request
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak ada aksi setelah response
    }
}