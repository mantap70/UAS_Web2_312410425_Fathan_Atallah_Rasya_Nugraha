<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Handle OPTIONS preflight dari browser (untuk CORS)
$routes->options('(:any)', static function () {});

// ─── PUBLIC ROUTES (tidak perlu token) ────────────────────────────────────────
$routes->post('auth/login', 'AuthController::login');

// Pengunjung boleh melihat data buku dan genre
$routes->get('buku',            'BukuController::index');
$routes->get('buku/(:num)',     'BukuController::show/$1');
$routes->get('genre',           'GenreController::index');
$routes->get('penulis',         'PenulisController::index');
$routes->get('dashboard/stats', 'DashboardController::stats');

// ─── PROTECTED ROUTES (wajib pakai token) ─────────────────────────────────────
$routes->group('', ['filter' => 'auth'], static function ($routes) {

    // Auth
    $routes->post('auth/logout', 'AuthController::logout');

    // Buku — hanya CUD yang diproteksi
    $routes->post('buku',          'BukuController::create');
    $routes->put('buku/(:num)',    'BukuController::update/$1');
    $routes->delete('buku/(:num)', 'BukuController::delete/$1');

    // Genre
    $routes->post('genre',          'GenreController::create');
    $routes->put('genre/(:num)',    'GenreController::update/$1');
    $routes->delete('genre/(:num)', 'GenreController::delete/$1');

    // Penulis
    $routes->get('penulis/(:num)',     'PenulisController::show/$1');
    $routes->post('penulis',           'PenulisController::create');
    $routes->put('penulis/(:num)',     'PenulisController::update/$1');
    $routes->delete('penulis/(:num)',  'PenulisController::delete/$1');

    // Anggota
    $routes->get('anggota',            'AnggotaController::index');
    $routes->get('anggota/(:num)',     'AnggotaController::show/$1');
    $routes->post('anggota',           'AnggotaController::create');
    $routes->put('anggota/(:num)',     'AnggotaController::update/$1');
    $routes->delete('anggota/(:num)',  'AnggotaController::delete/$1');

    // Peminjaman
    $routes->get('peminjaman',             'PeminjamanController::index');
    $routes->get('peminjaman/(:num)',      'PeminjamanController::show/$1');
    $routes->post('peminjaman',            'PeminjamanController::create');
    $routes->put('peminjaman/(:num)',      'PeminjamanController::update/$1');
    $routes->delete('peminjaman/(:num)',   'PeminjamanController::delete/$1');
});