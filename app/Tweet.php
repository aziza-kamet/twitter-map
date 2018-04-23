<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Tweet extends Model
{
    use Traits\InsertOrUpdate;

    protected $fillable = ['tid', 'login', 'username', 'content', 'lat', 'long'];

    public static function addRecent($q = 'job')
    {
        $tweets = \Twitter::getSearch(['q' => $q, 'count' => '100', 'result_type' => 'recent']);
        $mappedTweets = collect($tweets->statuses)->filter(function ($tweet) {
            return $tweet->geo != null && $tweet->geo->type === 'Point';
        })->map(function ($tweet) {
            [$lat, $lng] = $tweet->geo->coordinates;
            return [
                'tid' => $tweet->id,
                'username' => $tweet->user->name,
                'login' => $tweet->user->screen_name,
                'content' => $tweet->text,
                'lat' => $lat,
                'lng' => $lng,
                'created_at' => Carbon::parse($tweet->created_at)->format('Y-m-d')
            ];
        });

        if ($mappedTweets->isNotEmpty()) {
            self::insertOrUpdate($mappedTweets->toArray());
        }
    }
}
