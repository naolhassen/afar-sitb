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

        // 2. Global Bureau Site Settings
        SiteSetting::updateOrCreate(
            ['id' => 1],
            [
                'hero_title_en' => 'Afar Regional Science, Innovation & Technology Bureau',
                'hero_title_am' => 'የአፋር ክልል ሳይንስ፣ ፈጠራና ቴክኖሎጂ ቢሮ',
                'hero_title_aa' => 'Qafar Rakaakayak Saaynis, Mabla Kee Teknoolojik Biiro',
                'hero_subtitle_en' => 'Empowering pastoralist communities and driving digital transformation through indigenous knowledge, scientific innovation, and resilient technological infrastructure.',
                'hero_subtitle_am' => 'አርብቶ አደሩን ማህበረሰብ በሳይንሳዊ ፈጠራና ዲጂታል ቴክኖሎጂ ማብቃት።',
                'hero_subtitle_aa' => 'Qafar ummata saaynis kee teknoolojit tayseeh yan abnissoh ayyaafaqiyya.',
                'contact_email' => 'info@asitb.et',
                'contact_phone' => '+251 33 666 0123',
                'contact_address' => 'Semera-Logia Road, Bureau Complex, Afar, Ethiopia',
                'working_hours' => 'Mon - Fri: 8:00 AM - 5:00 PM',
                'stats' => [
                    ['label' => 'Districts Connected', 'value' => '32+'],
                    ['label' => 'Digital Centers', 'value' => '18'],
                    ['label' => 'Youth Innovators Supported', 'value' => '1,450+'],
                    ['label' => 'Solar-Powered Stations', 'value' => '45+'],
                ],
            ]
        );

        // 3. Strategic Sectors
        $sectors = [
            [
                'name_en' => 'Digital Government & e-Services',
                'name_am' => 'ዲጂታል መንግስት እና የኤሌክትሮኒክስ አገልግሎቶች',
                'name_aa' => 'Digitaal Dawlat Kee e-Qadaamiita',
                'description_en' => 'Modernizing regional public administration through unified citizen portals and cloud services.',
                'icon' => 'Server',
                'order' => 1,
            ],
            [
                'name_en' => 'Smart Pastoralist & Climate Tech',
                'name_am' => 'ስማርት አርብቶ አደር እና የአየር ንብረት ቴክኖሎጂ',
                'name_aa' => 'Ittokaa Kaxxa Qaleeliyya Kee Cawaalisa Teknooloji',
                'description_en' => 'IoT satellite monitoring for grazing land, water boreholes, and early weather alerts.',
                'icon' => 'Satellite',
                'order' => 2,
            ],
            [
                'name_en' => 'Renewable Energy & Geothermal Research',
                'name_am' => 'ታዳሽ ኃይል እና የጂኦተርማል ምርምር',
                'name_aa' => 'Taadaash Cayla Kee Geothermal Faatisisso',
                'description_en' => 'Harnessing the Great Rift Valley geothermal and solar power for regional energy access.',
                'icon' => 'Sun',
                'order' => 3,
            ],
        ];

        foreach ($sectors as $sector) {
            Sector::create($sector);
        }
    }
}
