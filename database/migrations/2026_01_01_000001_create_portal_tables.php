<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title_aa');
            $table->string('title_am');
            $table->string('title_en');
            $table->text('content_aa');
            $table->text('content_am');
            $table->text('content_en');
            $table->string('category')->default('News');
            $table->string('image_url')->nullable();
            $table->timestamp('published_at')->useCurrent();
            $table->string('author')->nullable();
            $table->unsignedBigInteger('views_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title_aa');
            $table->string('title_am');
            $table->string('title_en');
            $table->text('description_aa');
            $table->text('description_am');
            $table->text('description_en');
            $table->date('date');
            $table->string('time')->nullable();
            $table->string('location_aa');
            $table->string('location_am');
            $table->string('location_en');
            $table->string('image_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('directorates', function (Blueprint $table) {
            $table->id();
            $table->string('name_aa');
            $table->string('name_am');
            $table->string('name_en');
            $table->text('description_aa');
            $table->text('description_am');
            $table->text('description_en');
            $table->string('director_name_aa')->nullable();
            $table->string('director_name_am')->nullable();
            $table->string('director_name_en')->nullable();
            $table->string('director_title_aa')->nullable();
            $table->string('director_title_am')->nullable();
            $table->string('director_title_en')->nullable();
            $table->string('director_image')->nullable();
            $table->string('director_phone')->nullable();
            $table->string('director_email')->nullable();
            $table->jsonb('services')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->string('name_aa');
            $table->string('name_am');
            $table->string('name_en');
            $table->text('description_aa');
            $table->text('description_am');
            $table->text('description_en');
            $table->string('icon')->default('Cpu');
            $table->jsonb('initiatives')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title_aa')->nullable();
            $table->string('title_am')->nullable();
            $table->string('title_en')->nullable();
            $table->string('image_url');
            $table->string('category')->default('Events');
            $table->string('type')->default('IMAGE');
            $table->timestamps();
        });

        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title_aa');
            $table->string('title_am');
            $table->string('title_en');
            $table->text('description_aa')->nullable();
            $table->text('description_am')->nullable();
            $table->text('description_en')->nullable();
            $table->string('file_url');
            $table->string('file_size')->nullable();
            $table->string('file_type')->default('PDF');
            $table->date('published_at')->useCurrent();
            $table->unsignedBigInteger('downloads_count')->default(0);
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title_aa')->nullable();
            $table->string('hero_title_am')->nullable();
            $table->string('hero_title_en')->nullable();
            $table->text('hero_subtitle_aa')->nullable();
            $table->text('hero_subtitle_am')->nullable();
            $table->text('hero_subtitle_en')->nullable();
            $table->text('about_text_aa')->nullable();
            $table->text('about_text_am')->nullable();
            $table->text('about_text_en')->nullable();
            $table->text('mission_aa')->nullable();
            $table->text('mission_am')->nullable();
            $table->text('mission_en')->nullable();
            $table->text('vision_aa')->nullable();
            $table->text('vision_am')->nullable();
            $table->text('vision_en')->nullable();
            $table->text('values_aa')->nullable();
            $table->text('values_am')->nullable();
            $table->text('values_en')->nullable();
            $table->jsonb('stats')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_address')->nullable();
            $table->string('working_hours')->nullable();
            $table->jsonb('social_links')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('publications');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('sectors');
        Schema::dropIfExists('directorates');
        Schema::dropIfExists('events');
        Schema::dropIfExists('news');
    }
};
