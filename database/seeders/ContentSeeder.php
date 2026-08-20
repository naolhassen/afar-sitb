<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $jsonPath = __DIR__ . '/content.json';

        if (!File::exists($jsonPath)) {
            throw new \RuntimeException('content.json not found in database/seeders');
        }

        $data = json_decode(File::get($jsonPath), true);

        // 1. Site Settings
        DB::table('site_settings')->delete();

        $settings = $data['initialSiteSettings'];
        $now = Carbon::now();

        DB::table('site_settings')->insert([
            'hero_title_en'    => 'Afar Regional Science, Innovation & Technology Bureau',
            'hero_title_am'    => 'የአፋር ክልል ሳይንስ፣ ፈጠራና ቴክኖሎጂ ቢሮ',
            'hero_title_aa'    => 'Qafar Rakaakayak Saaynis, Mabla Kee Teknoolojik Biiro',
            'hero_subtitle_en' => 'Empowering pastoralist communities and driving digital transformation through indigenous knowledge, scientific innovation, and resilient technological infrastructure.',
            'hero_subtitle_am' => 'አርብቶ አደሩን ማህበረሰብ በሳይንሳዊ ፈጠራና ዲጂታል ቴክኖሎጂ ማብቃት።',
            'hero_subtitle_aa' => 'Qafar ummata saaynis kee teknoolojit tayseeh yan abnissoh ayyaafaqiyya.',
            'about_text_aa'    => $settings['historyAf'] ?? null,
            'about_text_am'    => $settings['historyAm'] ?? null,
            'about_text_en'    => $settings['historyEn'] ?? null,
            'mission_aa'       => $settings['missionAf'] ?? null,
            'mission_am'       => $settings['missionAm'] ?? null,
            'mission_en'       => $settings['missionEn'] ?? null,
            'vision_aa'        => $settings['visionAf'] ?? null,
            'vision_am'        => $settings['visionAm'] ?? null,
            'vision_en'        => $settings['visionEn'] ?? null,
            'values_aa'        => $settings['valuesAf'] ?? null,
            'values_am'        => $settings['valuesAm'] ?? null,
            'values_en'        => $settings['valuesEn'] ?? null,
            'contact_phone'    => $settings['phone'] ?? null,
            'contact_email'    => $settings['email'] ?? null,
            'contact_address'  => $settings['addressEn'] ?? null,
            'working_hours'    => 'Mon - Fri: 8:00 AM - 5:00 PM',
            'social_links'     => json_encode([
                'facebook'  => $settings['facebookUrl'] ?? null,
                'telegram'  => $settings['telegramUrl'] ?? null,
                'twitter'   => $settings['twitterUrl'] ?? null,
                'instagram' => $settings['instagramUrl'] ?? null,
                'youtube'   => $settings['youtubeUrl'] ?? null,
            ]),
            'stats'            => json_encode([
                ['label' => 'Services', 'value' => '12'],
                ['label' => 'Directorates', 'value' => '5'],
                ['label' => 'News', 'value' => '3'],
                ['label' => 'Gallery Items', 'value' => '6'],
            ]),
            'created_at'       => $now,
            'updated_at'       => $now,
        ]);

        // 2. Directorates
        DB::table('directorates')->delete();
        foreach ($data['initialDirectorates'] as $idx => $directorate) {
            DB::table('directorates')->insert([
                'name_aa'        => $directorate['nameAf'] ?? null,
                'name_am'        => $directorate['nameAm'] ?? null,
                'name_en'        => $directorate['nameEn'] ?? null,
                'description_aa' => $directorate['descriptionAf'] ?? null,
                'description_am' => $directorate['descriptionAm'] ?? null,
                'description_en' => $directorate['descriptionEn'] ?? null,
                'order'          => $directorate['order'] ?? ($idx + 1),
                'created_at'     => Carbon::parse($directorate['createdAt'] ?? $now),
                'updated_at'     => Carbon::parse($directorate['updatedAt'] ?? $now),
            ]);
        }

        // 3. Sectors (Services)
        DB::table('sectors')->delete();
        foreach ($data['initialSectors'] as $idx => $sector) {
            DB::table('sectors')->insert([
                'name_aa'        => $sector['nameAf'] ?? null,
                'name_am'        => $sector['nameAm'] ?? null,
                'name_en'        => $sector['nameEn'] ?? null,
                'description_aa' => $sector['descriptionAf'] ?? null,
                'description_am' => $sector['descriptionAm'] ?? null,
                'description_en' => $sector['descriptionEn'] ?? null,
                'icon'           => 'Cpu',
                'order'          => $sector['order'] ?? ($idx + 1),
                'created_at'     => Carbon::parse($sector['createdAt'] ?? $now),
                'updated_at'     => Carbon::parse($sector['updatedAt'] ?? $now),
            ]);
        }

        // 4. News
        DB::table('news')->delete();
        foreach ($data['initialNews'] as $idx => $news) {
            DB::table('news')->insert([
                'title_aa'     => $news['titleAf'] ?? null,
                'title_am'     => $news['titleAm'] ?? null,
                'title_en'     => $news['titleEn'] ?? null,
                'content_aa'   => $news['contentAf'] ?? null,
                'content_am'   => $news['contentAm'] ?? null,
                'content_en'   => $news['contentEn'] ?? null,
                'category'     => 'News',
                'image_url'    => $news['coverImage'] ?? null,
                'published_at' => Carbon::parse($news['publishedAt'] ?? $now),
                'author'       => $settings['bureauHeadName'] ?? null,
                'views_count'  => 0,
                'is_featured'  => $idx === 0,
                'created_at'   => Carbon::parse($news['createdAt'] ?? $now),
                'updated_at'   => Carbon::parse($news['updatedAt'] ?? $now),
            ]);
        }

        // 5. Events
        DB::table('events')->delete();
        foreach ($data['initialEvents'] as $idx => $event) {
            DB::table('events')->insert([
                'title_aa'       => $event['titleAf'] ?? null,
                'title_am'       => $event['titleAm'] ?? null,
                'title_en'       => $event['titleEn'] ?? null,
                'description_aa' => $event['descriptionAf'] ?? null,
                'description_am' => $event['descriptionAm'] ?? null,
                'description_en' => $event['descriptionEn'] ?? null,
                'date'           => Carbon::parse($event['startDate'] ?? $now)->toDateString(),
                'time'           => Carbon::parse($event['startDate'] ?? $now)->format('H:i'),
                'location_aa'    => $event['location'] ?? null,
                'location_am'    => $event['location'] ?? null,
                'location_en'    => $event['location'] ?? null,
                'image_url'      => $event['coverImage'] ?? null,
                'is_featured'    => $idx === 0,
                'created_at'     => Carbon::parse($event['createdAt'] ?? $now),
                'updated_at'     => Carbon::parse($event['updatedAt'] ?? $now),
            ]);
        }

        // 6. Gallery
        DB::table('galleries')->delete();
        foreach ($data['initialGalleryItems'] as $item) {
            DB::table('galleries')->insert([
                'title_aa'   => $item['titleAf'] ?? null,
                'title_am'   => $item['titleAm'] ?? null,
                'title_en'   => $item['titleEn'] ?? null,
                'image_url'  => $item['imageUrl'] ?? null,
                'category'   => 'Events',
                'type'       => $item['type'] ?? 'IMAGE',
                'created_at' => Carbon::parse($item['createdAt'] ?? $now),
                'updated_at' => Carbon::parse($item['updatedAt'] ?? $item['createdAt'] ?? $now),
            ]);
        }

        // 7. Publications
        DB::table('publications')->delete();
        foreach ($data['initialPublications'] as $publication) {
            DB::table('publications')->insert([
                'title_aa'       => $publication['titleAf'] ?? null,
                'title_am'       => $publication['titleAm'] ?? null,
                'title_en'       => $publication['titleEn'] ?? null,
                'description_aa' => $publication['descriptionAf'] ?? null,
                'description_am' => $publication['descriptionAm'] ?? null,
                'description_en' => $publication['descriptionEn'] ?? null,
                'file_url'       => $publication['fileUrl'] ?? '#',
                'file_size'      => null,
                'file_type'      => 'PDF',
                'published_at'   => Carbon::parse($publication['createdAt'] ?? $now)->toDateString(),
                'downloads_count' => 0,
                'created_at'     => Carbon::parse($publication['createdAt'] ?? $now),
                'updated_at'     => Carbon::parse($publication['updatedAt'] ?? $now),
            ]);
        }
    }
}
