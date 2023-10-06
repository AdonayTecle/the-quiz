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
        // Define the path to your quiz.json file
        $filePath = storage_path('app/quiz.json');

        // Check if the file exists
        if (File::exists($filePath)) {
            // Read the contents of the JSON file
            $jsonContents = File::get($filePath);

            // Parse the JSON data
            $quizData = json_decode($jsonContents, true);

            return $quizData;

            // Now, $quizData contains the parsed JSON data
            // You can access quiz data like $quizData['quiz_name'] and $quizData['questions']
        } else {
            // Handle the case where the file does not exist
            abort(404, 'Quiz data not found.');
        }
    }


    public function submitScore(Request $request)
    {
        
        try {

            $name = $request['name'];
            $email = $request['email'];
            $score = $request['score'];

            // You need to implement database storage here, e.g., using Eloquent
            // Example:
            QuizResult::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'score' => $request['score'],
            ]);

            // Redirect to high scores page
            return 'Score was successfuly stored.';
        } catch (QueryException $e) {
            // Log the error for debugging purposes
            //Log::error('Error storing quiz result: ' . $e->getMessage());

            // Return a 500 internal server error response
            return response()->json(['error' => 'An error occurred while storing the quiz result.'], 500);
        }
    }

    public function highScores()
    {
        // Retrieve high scores from the database and pass them to the Blade view
        // Example:
        $highScores = QuizResult::orderBy('score', 'desc')->limit(10)->get();

        // You need to retrieve high scores from the database here

        return $highScores;
    }
}
