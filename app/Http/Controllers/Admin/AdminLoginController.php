<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminLoginController extends Controller
{
    public function show(Request $request)
    {
        $locale = $request->route('locale') ?? 'en';

        return Inertia::render('LoginPage', [
            'locale' => $locale,
        ]);
    }

    public function login(Request $request)
    {
        $locale = $request->route('locale') ?? 'en';

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended("/{$locale}/admin");
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        $locale = $request->route('locale') ?? 'en';

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect("/{$locale}");
    }
}
