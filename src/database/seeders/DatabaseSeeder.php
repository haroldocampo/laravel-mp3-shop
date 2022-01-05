<?php

namespace Database\Seeders;

use App\Models\Song;
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
        $songs = Song::all();

        if (count($songs) >= 5)
            return;

        $faker = Faker::create();

        for ($i = 0; $i < 5; $i++) {
            $song = new Song;
            $song->songName = $faker->catchPhrase;
            $song->artist = $faker->name();
            $song->save();
        }
    }

}
