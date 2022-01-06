<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Song;
use App\Models\UserSong;
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

    /**
     * Get all songs from library
     *
     * @return \App\Models\Song
     */
    public function library()
    {
        $userId = request()->query('user_id');
        $userSongs = UserSong::where('user_id', $userId)->get();
        $library = [];

        foreach($userSongs as $us) {
            $song = Song::find($us->song_id);
            $library[] = $song;
        }

        return response()->json($library);
    }

    /**
     * Checkout songs from cart
     *
     * @return \App\Models\Song
     */
    public function checkout()
    {
        $userId = request()->input('user_id');
        $songIds = request()->input('song_ids');
        $songs = Song::whereIn('id', $songIds)->get();
        $library = [];

        foreach($songs as $s) {
            $duplicate = UserSong::where(['user_id' => $userId, 'song_id' => $s->id])->first();

            if ($duplicate) {
                continue;
            }
            
            $us = new UserSong();
            $us->song_id = $s->id;
            $us->user_id = $userId;

            $library[] = $us;
            $us->save();
        }

        return response()->json($library);
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