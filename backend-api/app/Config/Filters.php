<?php

namespace Config;

use App\Filters\AuthFilter;
use App\Filters\CorsFilter;
use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseConfig
{
    /**
     * Daftarkan alias untuk setiap filter yang dipakai
     */
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'auth'          => AuthFilter::class,  // ← filter token kita
        'cors'          => CorsFilter::class,  // ← filter CORS kita
    ];

    /**
     * Filter yang berjalan di SEMUA route (global)
     */
    public array $globals = [
        'before' => [
            'cors',  // CORS aktif di semua request
            // CSRF dinonaktifkan untuk API (tidak pakai form HTML)
        ],
        'after' => [
            'toolbar',
            'cors',
        ],
    ];

    public array $methods = [];

    public array $filters = [];
}