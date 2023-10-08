<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\QuizResult;

class QuizController extends Controller
{
    public function index()
    {
        $quizData = $this->readQuizJson();

        return response()->json($quizData);
    }


    public function readQuizJson()
    {
        $filePath = storage_path('app/quiz.json');

        // Check if the file exists
        if (File::exists($filePath)) {

            // Read the contents of the JSON file
            $jsonContents = File::get($filePath);

            // Parse the JSON data
            $quizData = json_decode($jsonContents, true);

            return $quizData;

        } else {

            abort(404, 'Quiz data not found.');
        }
    }


    public function submitScore(Request $request){

    //validation rules
    $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'score' => 'required|integer',
    ];

    //validate the request data
    $validatedData = $request->validate($rules);

    try {
        $name = $validatedData['name'];
        $email = $validatedData['email'];
        $score = $validatedData['score'];

        QuizResult::create([
            'name' => $name,
            'email' => $email,
            'score' => $score,
        ]);

        return 'Score was successfully stored.';
    } catch (QueryException $e) {
        // Return a 500 internal server error response
        return response()->json(['error' => 'An error occurred while storing the quiz result.'], 500);
    }
}

    public function highScores()
    {
        //retrieve quiz results in descending order
        $highScores = QuizResult::orderBy('score', 'desc')->get();

        return $highScores;
    }
}
