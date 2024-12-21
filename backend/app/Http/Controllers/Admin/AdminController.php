<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthAdminRequest;
use App\Models\Definition;
use App\Models\Plan;
use App\Models\Subscription;
use App\Models\Synonym;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    /**
     * Admin dashboard
     */
    public function index()
    {
        $definitions = Definition::all();
        $words = Word::all();
        $synonyms = Synonym::all();
        $plans = Plan::all();
        $subscriptions = Subscription::all();

        return view('admin.dashboard')->with([
            'definitions' => $definitions,
            'words' => $words,
            'synonyms' => $synonyms,
            'plans' => $plans,
            'subscriptions' => $subscriptions,
        ]);
    }

    /**
     * Display the login form for the admin
     */
    public function login()
    {
        if(auth()->guard('admin')->check())
        {
            return redirect()->route('admin.index');
        }

        return view('admin.login');
    }

    /**
     * Login the admin
     */
    public function auth(AuthAdminRequest $request)
    {
        if($request->validated())
        {
            if(auth()->guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password,
            ])) {
                $request->session()->regenerate();
                return redirect()->route('admin.index');
            }else {
                throw ValidationException::withMessages([
                    'email' => 'These credentials do not match our records.'
                ]);
            }
            
        }
    }

    /**
     * Logout the admin
     */
    public function logout()
    {
        auth()->guard('admin')->logout();
        return redirect()->route('admin.login');
    }
}
