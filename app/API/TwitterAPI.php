<?php

namespace App\API;

class TwitterAPI
{
    private static $STRING_SIZE = 42;

    public static function get($url)
    {
        $method = 'GET';
        // $url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

        $timestamp = time();
        $nonce = str_random(self::$STRING_SIZE);

        $data = urlencode('oauth_consumer_key=' . env('TWITTER_CONSUMER_KEY', '') .
                          '&oauth_nonce=' . $nonce .
                          '&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' . $timestamp .
                          '&oauth_token=' . env('TWITTER_ACCESS_TOKEN', '') . '&oauth_version=1.0');
        $key = urlencode(env('TWITTER_CONSUMER_SECRET', '')) . '&' . urlencode(env('TWITTER_ACCESS_TOKEN_SECRET', ''));

        $signatureBase = $method . '&' . urlencode($url) . '&' . $data;
        $signature = urlencode(base64_encode(hash_hmac('sha1', $signatureBase, $key, true)));

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Authorization: OAuth oauth_consumer_key="' . env('TWITTER_CONSUMER_KEY', '') .
          '", oauth_nonce="' . $nonce .
          '", oauth_signature="' . $signature .
          '", oauth_signature_method="HMAC-SHA1", oauth_timestamp="' . $timestamp .
          '", oauth_token="' . env('TWITTER_ACCESS_TOKEN', '') . '", oauth_version="1.0"'
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);

        return $output;
    }
}
