<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Song;
use Auth;

class ShopController extends Controller
{
    /**
     * Get all songs from database
     *
     * @return \App\Models\Song
     */
    public function songs()
    {
        return response()->json(Song::all());
    }

    public function authcheck()
    {
        if (request()->query('token') != null) {
            $token = request()->query('token');
            $user = User::where('password', $token)->first();
            if ($user) {
                return response()->json($user);
            } else {
                return response()->json(false);
            }
        } else {
            if (Auth::check()) {
                return response()->json(Auth::user());
            }
            
            return response()->json(false);
        }
    }
}