<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table         = 'users';
    protected $primaryKey    = 'id';
    protected $allowedFields = ['nama', 'email', 'password', 'role', 'token'];
    protected $useTimestamps = true;

    // Sembunyikan field password dari hasil query
    protected $hidden = ['password'];
}