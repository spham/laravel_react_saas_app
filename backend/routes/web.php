<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DefinitionController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SubscriptionController;
use App\Http\Controllers\Admin\SynonymController;
use App\Http\Controllers\Admin\WordController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class,'login'])->name('admin.login');
Route::post('admin/auth', [AdminController::class,'auth'])->name('admin.auth');

Route::prefix('admin')->middleware('admin')->group(function() {
    Route::get('dashboard', [AdminController::class,'index'])->name('admin.index');
    Route::post('logout', [AdminController::class,'logout'])->name('admin.logout');
    //words routes
    Route::resource('words', WordController::class, [
        'names' => [
            'index' => 'admin.words.index',
            'create' => 'admin.words.create',
            'store' => 'admin.words.store',
            'edit' => 'admin.words.edit',
            'update' => 'admin.words.update',
            'destroy' => 'admin.words.destroy',
        ]
    ]);
    //definitions routes
    Route::resource('definitions', DefinitionController::class, [
        'names' => [
            'index' => 'admin.definitions.index',
            'create' => 'admin.definitions.create',
            'store' => 'admin.definitions.store',
            'edit' => 'admin.definitions.edit',
            'update' => 'admin.definitions.update',
            'destroy' => 'admin.definitions.destroy',
        ]
    ]);
    //synonyms routes
    Route::resource('synonyms', SynonymController::class, [
        'names' => [
            'index' => 'admin.synonyms.index',
            'create' => 'admin.synonyms.create',
            'store' => 'admin.synonyms.store',
            'edit' => 'admin.synonyms.edit',
            'update' => 'admin.synonyms.update',
            'destroy' => 'admin.synonyms.destroy',
        ]
    ]);
    //plans routes
    Route::resource('plans', PlanController::class, [
        'names' => [
            'index' => 'admin.plans.index',
            'create' => 'admin.plans.create',
            'store' => 'admin.plans.store',
            'edit' => 'admin.plans.edit',
            'update' => 'admin.plans.update',
            'destroy' => 'admin.plans.destroy',
        ]
    ]);
    //subscriptions routes
    Route::get('subscriptions', [SubscriptionController::class,'index'])->name('admin.subscriptions.index');
});
