<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'TweetController@index');
Route::get('/api/tweets', 'TweetController@list');
Route::get('/api/refresh_tweets', 'TweetController@refreshAndList');
