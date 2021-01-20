//Set up array with question objects
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ___.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    }
];


//Timer
var timer = document.querySelector("#timer");
var startTimer = document.querySelector("#submit");
var secondsLeft = 60;
var pentalty = 10;

startTimer.addEventListener ("click", function () { 
    var timerInterval = setInterval(function () { 
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0) { 
            clearInterval(timerInterval);
            timer.textContent = "Time's Up!";
        }
    }, 1000);
})

function generateQuiz (questions, quizContainer, resultsContainer, submitButton) {
    
    function showQuestions (questions, quizContainer) { 
        //Clear data
        questionsDiv.innerHTML = "";
        ul
    }
    function showResults (questions, quizContainer, resultsContainer) {

    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }
}
