<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('quiz-data', 'App\Http\Controllers\QuizController@index');

Route::post('submit-score', 'App\Http\Controllers\QuizController@submitScore');

Route::get('high-scores', 'App\Http\Controllers\QuizController@highScores');