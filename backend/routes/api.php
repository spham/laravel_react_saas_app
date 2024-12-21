<?php

use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WordController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function() {
    //user routes
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class,'logout']);
    Route::get('user/decrement/hearts', [UserController::class,'decrementUserHearts']);
    //subscription routes
    Route::post('subscribe', [SubscriptionController::class,'create']);
    Route::post('cancel', [SubscriptionController::class,'cancel']);
});

//word routes
Route::get('words/{searchTerm}/find', [WordController::class,'findWordByTerm']);
Route::get('words/{character}/starts', [WordController::class,'findWordStartWith']);
Route::get('random/word', [WordController::class,'getRandomWord']);

//user guest routes
Route::post('user/register', [UserController::class,'store']);
Route::post('user/login', [UserController::class,'auth']);

//plans routes
Route::get('plans', [SubscriptionController::class,'index']);
