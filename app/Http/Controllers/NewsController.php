<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request, string $locale = 'en'): Response
    {
        $category = $request->query('category');
        $query = News::latest('published_at');

        if ($category && $category !== 'All') {
            $query->where('category', $category);
        }

        $news = $query->paginate(12)->withQueryString();

        return Inertia::render('NewsPage', [
            'locale' => $locale,
            'news' => $news,
            'selectedCategory' => $category ?? 'All',
        ]);
    }

    public function show(Request $request, string $locale, int $id): Response
    {
        $article = News::findOrFail($id);
        $article->increment('views_count');

        $relatedNews = News::where('id', '!=', $id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('NewsDetailPage', [
            'locale' => $locale,
            'article' => $article,
            'relatedNews' => $relatedNews,
        ]);
    }
}
