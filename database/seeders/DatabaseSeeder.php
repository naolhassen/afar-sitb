<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SiteSetting;
use App\Models\Sector;
use App\Models\Directorate;
use App\Models\News;
use App\Models\Event;
use App\Models\Publication;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@asitb.et'],
            [
                'name' => 'Bureau Administrator',
                'password' => Hash::make('Admin@ASITB2026!'),
                'role' => 'admin',
            ]
        );

        // 2. Load full portal content from content.json
        $this->call(ContentSeeder::class);
    }
}
