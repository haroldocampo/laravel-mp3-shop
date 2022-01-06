<?php

namespace Database\Seeders;

use App\Models\Song;
use App\Models\UserSong;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        UserSong::truncate();
        Song::truncate();

        $songs = Song::all();

        if (count($songs) >= 5)
            return;

        $faker = Faker::create();

        for ($i = 1; $i <= 5; $i++) {
            $song = new Song;
            $song->songName = $faker->catchPhrase;
            $song->artist = $faker->name();
            $song->url = "/music/${i}.mp3";
            $song->save();
        }
    }

}
