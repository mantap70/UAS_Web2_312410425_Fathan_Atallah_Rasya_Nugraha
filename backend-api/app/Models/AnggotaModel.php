<?php

namespace App\Models;

use CodeIgniter\Model;

class AnggotaModel extends Model
{
    protected $table         = 'anggota';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama', 'email', 'telepon', 'alamat'];
    protected $useTimestamps = true;
}