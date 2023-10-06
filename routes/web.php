<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/




Route::view('/', 'welcome');
//Route::get('/', 'App\Http\Controllers\QuizController@index');
Route::post('/submit', 'QuizController@submit')->name('quiz.submit');

//Route::get('/high-scores', 'App\Http\Controllers\QuizController@highScores')->name('high-scores');



