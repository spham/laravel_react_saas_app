<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Store the new user
     */
    public function store(StoreUserRequest $request)
    {
        if($request->validated()) {
            $data =$request->validated();
            $data['number_of_hearts'] = 5;
            User::create($data);
            return response()->json([
                'message' => 'Account created successfully'
            ]);
        }
    }

    /**
     * Log in the user
     */
    public function auth(AuthUserRequest $request)
    {
        if($request->validated()) {
            $user = User::whereEmail($request->email)->first();
            if(!$user || !Hash::check($request->password,$user->password)) {
                throw ValidationException::withMessages([
                    'email' => 'These credentials do not match our records.'
                ]);
            }else {
                return response()->json([
                    'user' => UserResource::make($user),
                    'access_token' => $user->createToken('new_user')->plainTextToken,
                    'message' => 'Logged in successfully'
                ]);
            }
        }
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * Decrement user number of hearts
     */
    public function decrementUserHearts(Request $request)
    {
        $user = $request->user();
        $user->decrement('number_of_hearts');
        return response()->json([
            'user' => UserResource::make($user)
        ]);
    }
}
