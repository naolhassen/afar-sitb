<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Event;
use App\Models\Directorate;
use App\Models\Sector;
use App\Models\Gallery;
use App\Models\Publication;
use App\Models\SiteSetting;
use App\Models\ContactMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
    private function tableConfig(): array
    {
        return [
            'news' => [
                'model' => News::class,
                'label' => 'News Articles',
                'list_field' => 'title_en',
                'fields' => [
                    ['name' => 'title', 'label' => 'Title', 'type' => 'translatable', 'required' => true],
                    ['name' => 'content', 'label' => 'Content', 'type' => 'translatable_textarea', 'required' => true],
                    ['name' => 'category', 'label' => 'Category', 'type' => 'text'],
                    ['name' => 'image_url', 'label' => 'Cover Image', 'type' => 'file', 'accept' => 'image/*'],
                    ['name' => 'gallery', 'label' => 'Gallery', 'type' => 'multi-file', 'accept' => 'image/*'],
                    ['name' => 'published_at', 'label' => 'Published At', 'type' => 'datetime-local'],
                    ['name' => 'author', 'label' => 'Author', 'type' => 'text'],
                    ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'boolean'],
                ],
            ],
            'events' => [
                'model' => Event::class,
                'label' => 'Events',
                'list_field' => 'title_en',
                'fields' => [
                    ['name' => 'title', 'label' => 'Title', 'type' => 'translatable', 'required' => true],
                    ['name' => 'description', 'label' => 'Description', 'type' => 'translatable_textarea'],
                    ['name' => 'date', 'label' => 'Date', 'type' => 'date', 'required' => true],
                    ['name' => 'time', 'label' => 'Time', 'type' => 'text'],
                    ['name' => 'location', 'label' => 'Location', 'type' => 'translatable'],
                    ['name' => 'image_url', 'label' => 'Cover Image', 'type' => 'file', 'accept' => 'image/*'],
                    ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'boolean'],
                ],
            ],
            'directorates' => [
                'model' => Directorate::class,
                'label' => 'Directorates',
                'list_field' => 'name_en',
                'fields' => [
                    ['name' => 'name', 'label' => 'Name', 'type' => 'translatable', 'required' => true],
                    ['name' => 'description', 'label' => 'Description', 'type' => 'translatable_textarea'],
                    ['name' => 'order', 'label' => 'Order', 'type' => 'number'],
                    ['name' => 'director_name', 'label' => 'Director Name', 'type' => 'translatable'],
                    ['name' => 'director_title', 'label' => 'Director Title', 'type' => 'translatable'],
                    ['name' => 'director_image', 'label' => 'Director Image', 'type' => 'file', 'accept' => 'image/*'],
                    ['name' => 'director_phone', 'label' => 'Director Phone', 'type' => 'text'],
                    ['name' => 'director_email', 'label' => 'Director Email', 'type' => 'text'],
                ],
            ],
            'sectors' => [
                'model' => Sector::class,
                'label' => 'Sectors / Services',
                'list_field' => 'name_en',
                'fields' => [
                    ['name' => 'name', 'label' => 'Name', 'type' => 'translatable', 'required' => true],
                    ['name' => 'description', 'label' => 'Description', 'type' => 'translatable_textarea'],
                    ['name' => 'icon', 'label' => 'Icon', 'type' => 'text'],
                    ['name' => 'order', 'label' => 'Order', 'type' => 'number'],
                ],
            ],
            'gallery' => [
                'model' => Gallery::class,
                'label' => 'Gallery',
                'list_field' => 'title_en',
                'fields' => [
                    ['name' => 'title', 'label' => 'Title', 'type' => 'translatable'],
                    ['name' => 'image_url', 'label' => 'Image / Media', 'type' => 'file', 'accept' => 'image/*,video/*'],
                    ['name' => 'category', 'label' => 'Category', 'type' => 'text'],
                    ['name' => 'type', 'label' => 'Type', 'type' => 'select', 'options' => ['IMAGE' => 'Image', 'VIDEO' => 'Video']],
                ],
            ],
            'publications' => [
                'model' => Publication::class,
                'label' => 'Publications',
                'list_field' => 'title_en',
                'fields' => [
                    ['name' => 'title', 'label' => 'Title', 'type' => 'translatable', 'required' => true],
                    ['name' => 'description', 'label' => 'Description', 'type' => 'translatable_textarea'],
                    ['name' => 'file_url', 'label' => 'Document', 'type' => 'file', 'accept' => '.pdf,.doc,.docx'],
                    ['name' => 'file_size', 'label' => 'File Size', 'type' => 'text'],
                    ['name' => 'file_type', 'label' => 'File Type', 'type' => 'text'],
                    ['name' => 'published_at', 'label' => 'Published At', 'type' => 'date'],
                    ['name' => 'downloads_count', 'label' => 'Downloads', 'type' => 'number'],
                ],
            ],
            'settings' => [
                'model' => SiteSetting::class,
                'label' => 'Site Settings',
                'list_field' => 'hero_title_en',
                'single' => true,
                'fields' => [
                    ['name' => 'hero_title', 'label' => 'Hero Title', 'type' => 'translatable'],
                    ['name' => 'hero_subtitle', 'label' => 'Hero Subtitle', 'type' => 'translatable_textarea'],
                    ['name' => 'about_text', 'label' => 'About Text', 'type' => 'translatable_textarea'],
                    ['name' => 'mission', 'label' => 'Mission', 'type' => 'translatable_textarea'],
                    ['name' => 'vision', 'label' => 'Vision', 'type' => 'translatable_textarea'],
                    ['name' => 'values', 'label' => 'Values', 'type' => 'translatable_textarea'],
                    ['name' => 'contact_phone', 'label' => 'Contact Phone', 'type' => 'text'],
                    ['name' => 'contact_email', 'label' => 'Contact Email', 'type' => 'text'],
                    ['name' => 'contact_address', 'label' => 'Contact Address', 'type' => 'text'],
                    ['name' => 'working_hours', 'label' => 'Working Hours', 'type' => 'text'],
                ],
            ],
            'messages' => [
                'model' => ContactMessage::class,
                'label' => 'Inquiries',
                'list_field' => 'name',
                'readonly' => true,
                'fields' => [
                    ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
                    ['name' => 'email', 'label' => 'Email', 'type' => 'text'],
                    ['name' => 'phone', 'label' => 'Phone', 'type' => 'text'],
                    ['name' => 'subject', 'label' => 'Subject', 'type' => 'text'],
                    ['name' => 'message', 'label' => 'Message', 'type' => 'textarea'],
                    ['name' => 'is_read', 'label' => 'Read', 'type' => 'boolean'],
                ],
            ],
        ];
    }

    private function resolveTable(Request $request): ?string
    {
        $table = $request->input('table');
        $config = $this->tableConfig();

        if (! $table || ! isset($config[$table])) {
            return null;
        }

        return $table;
    }

    public function index(Request $request)
    {
        $locale = $request->route('locale') ?? 'en';
        $tables = collect($this->tableConfig())->map(fn ($c) => $c['label'])->toArray();
        $counts = collect($this->tableConfig())->map(function ($c) {
            if (! empty($c['single'])) {
                return $c['model']::exists() ? 1 : 0;
            }

            return $c['model']::count();
        })->toArray();

        return Inertia::render('DashboardPage', [
            'locale' => $locale,
            'tables' => $tables,
            'counts' => $counts,
        ]);
    }

    public function table(Request $request, string $locale, string $table)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect("/{$locale}/admin");
        }

        $model = $config['model'];
        $items = ! empty($config['single']) ? [$model::firstOrNew()] : $model::orderBy('id', 'desc')->get();

        $tables = collect($this->tableConfig())->map(fn ($c) => $c['label'])->toArray();

        return Inertia::render('AdminListPage', [
            'locale' => $locale,
            'table' => $table,
            'tables' => $tables,
            'items' => $items,
            'fields' => $config['fields'],
            'list_field' => $config['list_field'] ?? 'id',
            'readonly' => ! empty($config['readonly']),
            'single' => ! empty($config['single']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    public function create(Request $request, string $locale, string $table)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect("/{$locale}/admin");
        }

        $model = $config['model'];
        $item = new $model;
        $mode = 'create';

        if (! empty($config['single'])) {
            $existing = $model::first();
            if ($existing) {
                $item = $existing;
                $mode = 'edit';
            }
        }

        $tables = collect($this->tableConfig())->map(fn ($c) => $c['label'])->toArray();

        return Inertia::render('AdminFormPage', [
            'locale' => $locale,
            'mode' => $mode,
            'table' => $table,
            'tables' => $tables,
            'item' => $item,
            'fields' => $config['fields'],
            'list_field' => $config['list_field'] ?? 'id',
            'readonly' => ! empty($config['readonly']),
            'single' => ! empty($config['single']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    public function edit(Request $request, string $locale, string $table, int $id)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect("/{$locale}/admin");
        }

        $model = $config['model'];

        if (! empty($config['single'])) {
            $item = $model::firstOrNew();
        } else {
            $item = $model::findOrFail($id);
        }

        $tables = collect($this->tableConfig())->map(fn ($c) => $c['label'])->toArray();

        return Inertia::render('AdminFormPage', [
            'locale' => $locale,
            'mode' => 'edit',
            'table' => $table,
            'tables' => $tables,
            'item' => $item,
            'fields' => $config['fields'],
            'list_field' => $config['list_field'] ?? 'id',
            'readonly' => ! empty($config['readonly']),
            'single' => ! empty($config['single']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    private function buildRules(array $fields): array
    {
        $rules = [];

        foreach ($fields as $field) {
            $rule = $field['required'] ?? false ? 'required' : 'nullable';

            if ($field['type'] === 'translatable' || $field['type'] === 'translatable_textarea') {
                $rules["{$field['name']}_en"] = 'required';
                $rules["{$field['name']}_aa"] = 'nullable';
                $rules["{$field['name']}_am"] = 'nullable';
            } else {
                $rules[$field['name']] = $rule;
            }
        }

        return $rules;
    }

    private function extractData(Request $request, array $fields): array
    {
        $data = [];

        foreach ($fields as $field) {
            $name = $field['name'];
            $type = $field['type'];

            if ($type === 'translatable' || $type === 'translatable_textarea') {
                $en = $request->input("{$name}_en", '');
                $aa = $request->input("{$name}_aa") ?? $en;
                $am = $request->input("{$name}_am") ?? $en;

                $data["{$name}_aa"] = $aa ?: $en;
                $data["{$name}_am"] = $am ?: $en;
                $data["{$name}_en"] = $en;
            } elseif ($type === 'boolean') {
                $data[$name] = $request->boolean($name);
            } elseif ($type === 'number') {
                $data[$name] = (int) ($request->input($name) ?? 0);
            } elseif ($type === 'select') {
                $data[$name] = $request->input($name) ?: (array_key_first($field['options'] ?? []) ?? '');
            } elseif ($type === 'date' || $type === 'datetime-local') {
                $value = $request->input($name, '');

                if ($value) {
                    $value = str_replace('T', ' ', $value);
                    $data[$name] = $type === 'date'
                        ? Carbon::parse($value)->toDateString()
                        : Carbon::parse($value)->format('Y-m-d H:i:s');
                } else {
                    $data[$name] = $type === 'date'
                        ? Carbon::now()->toDateString()
                        : Carbon::now()->format('Y-m-d H:i:s');
                }
            } else {
                $data[$name] = $request->input($name, '');
            }
        }

        return $data;
    }

    public function store(Request $request, string $locale, string $table)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect()->back()->with('success', 'Unknown table.');
        }

        Validator::make($request->all(), $this->buildRules($config['fields']))->validate();

        $data = $this->extractData($request, $config['fields']);

        if ($table === 'news') {
            $data['slug'] = Str::slug($data['title_en'] ?? 'news-' . time());
            $data['views_count'] = 0;
        }

        if ($table === 'publications') {
            $data['downloads_count'] = 0;
        }

        if ($table === 'settings') {
            SiteSetting::updateOrCreate(['id' => 1], $data);
        } else {
            $config['model']::create($data);
        }

        return redirect("/{$locale}/admin/{$table}")->with('success', 'Created successfully.');
    }

    public function update(Request $request, string $locale, string $table, int $id)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect()->back()->with('success', 'Unknown table.');
        }

        Validator::make($request->all(), $this->buildRules($config['fields']))->validate();

        $data = $this->extractData($request, $config['fields']);

        if ($table === 'news') {
            $data['slug'] = Str::slug($data['title_en'] ?? 'news-' . time());
        }

        if ($table === 'settings') {
            SiteSetting::updateOrCreate(['id' => $id], $data);
        } else {
            $model = $config['model']::findOrFail($id);
            $model->update($data);
        }

        return redirect("/{$locale}/admin/{$table}")->with('success', 'Updated successfully.');
    }

    public function destroy(Request $request, string $locale, string $table, int $id)
    {
        $config = $this->tableConfig()[$table] ?? null;

        if (! $config) {
            return redirect()->back();
        }

        $model = $config['model']::findOrFail($id);
        $model->delete();

        return redirect("/{$locale}/admin/{$table}")->with('success', 'Deleted successfully.');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,webp,gif,pdf,doc,docx,mp4,mp3|max:10240',
        ]);

        $file = $request->file('file');
        $folder = date('Y-m-d');
        $filename = Str::random(16) . '_' . $file->getClientOriginalName();
        $uploadDir = public_path('uploads/' . $folder);

        if (! is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $file->move($uploadDir, $filename);

        return response()->json(['url' => "/uploads/{$folder}/{$filename}"]);
    }
}
