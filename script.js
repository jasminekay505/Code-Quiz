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
            timer.textContent = "You're out of time!!";
        }
    }, 1000);

   render();
});


var quiz = document.querySelector("#quiz");
var question = document.querySelector("#question");
var ulCreate = document.createElement("ul");
//Render question and choices to page
function render () { 
    //Clear previous content
    quiz.innerHTML = "";
    ulCreate.innerHTML = "";

    //For loop to go through questions
    for (var i = 0; i < questions.length; i ++) { 
        var newQuestion = questions[i].question;
        quiz.textContent = newQuestion;

        var choices = questions[i].choices;
    }
        choices.forEach(function (newChoice) {
            var listItem = document.createElement("li");
            listItem.textContent = newChoice;
            quiz.appendChild(ulCreate);
            ulCreate.appendChild(listItem);
            listItem.addEventListener("click", (compare));
        })  
}


