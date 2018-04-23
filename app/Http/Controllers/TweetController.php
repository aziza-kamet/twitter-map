<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Tweet;
use Carbon\Carbon;

class TweetController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        Tweet::addRecent();
        return view('tweets');
    }

    public function list()
    {
        $tweets = Tweet::where(
            'created_at',
            '>',
            Carbon::now()->subDays(7)->toDateTimeString()
        )->get();

        return response()->json($tweets);
    }

    public function refreshAndList()
    {
        Tweet::addRecent();
        return $this->list();
    }
}
