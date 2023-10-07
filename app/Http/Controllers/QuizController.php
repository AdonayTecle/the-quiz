<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\QuizResult;

class QuizController extends Controller
{
    public function index()
    {
        // Read quiz questions from quiz.json and pass them to the Blade view
        /*$quizData = json_decode(file_get_contents(public_path('quiz.json')), true);

        return view('quiz', compact('quizData'));
*/
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


    public function submitScore(Request $request)
    {
        
        try {

            $name = $request['name'];
            $email = $request['email'];
            $score = $request['score'];

            QuizResult::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'score' => $request['score'],
            ]);

            return 'Score was successfuly stored.';
        } catch (QueryException $e) {

            // Return a 500 internal server error response
            return response()->json(['error' => 'An error occurred while storing the quiz result.'], 500);
        }
    }

    public function highScores()
    {
        $highScores = QuizResult::orderBy('score', 'desc')->limit(10)->get();

        return $highScores;
    }
}
