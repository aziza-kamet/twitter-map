<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Tweet;

class DatabaseSeeder extends Seeder
{
    private $tables = [
        'users',
        'tweets'
    ];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->tables as $table) {
             DB::statement('SET FOREIGN_KEY_CHECKS=0;');
             DB::table($table)->truncate();
             DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}
