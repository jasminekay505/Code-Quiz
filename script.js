//Initialize index so that game begins with first question in questions array
var questionIndex = 0;
//Initialize game with a score of 0
var score = 0;
//define total game time
var secondsLeft = 60;
//Define timer penalty for incorrect answer
var penalty = 10;
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
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

//Set up high score storage array
var scoresFromStorage = JSON.parse(localStorage.getItem("scores"));
if (!scoresFromStorage) {
    scoresFromStorage = [];
}

//Select HTML elements so they can be used in script
//Timer elements
var timer = document.querySelector("#timer");
var startTimer = document.querySelector("#start");
//View high scores button
var viewScores = document.querySelector("#viewScores");
//Phases of the game
var welcome = document.querySelector("#welcome");
var quiz = document.querySelector("#quiz");
var gameOver = document.querySelector("#gameOver");
var highScore = document.querySelector("#highScore");
//Game over content
var finalScore = document.querySelector("#finalScore");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
//High scores content
var scoreSection = document.querySelector("#score-section");
var goBack = document.querySelector("#goBack");
var clearScores = document.querySelector("#clearScores");

//Set up html to show welcome content
welcome.style.display = "block";
quiz.style.display = "none";
gameOver.style.display = "none";
highScore.style.display = "none";

//Timer
startTimer.addEventListener("click", function () {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        //When timer reaches 0, tell the user and show game over content
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "You're out of time!!";
            welcome.style.display = "none";
            quiz.style.display = "none";
            gameOver.style.display = "block";
            highScore.style.display = "none";
            //Stop the countdown once all questions have been shown
        } else if (questionIndex === questions.length) {
            clearInterval(timerInterval);
            timer.textContent = "Game Over!!";
        }
    }, 1000);
    //Prints first question after start button is pressed
    renderQuiz();
});

//Quiz
function renderQuiz() {
    //Set up HTML to only show quiz content
    welcome.style.display = "none";
    quiz.style.display = "block";
    gameOver.style.display = "none";
    highScore.style.display = "none";

    //Clear previous content
    quiz.innerHTML = "";

    //Create element for question and print it to screen
    var questionEl = document.createElement("h5");
    questionEl.setAttribute("class", "card-title");
    var currentQuestion = questions[questionIndex].question;
    questionEl.textContent = currentQuestion;
    quiz.appendChild(questionEl);

    //Create elements for choices and print them to the screen
    var choices = questions[questionIndex].choices;
    for (var i = 0; i < choices.length; i++) {
        var choicesEl = document.createElement("button");
        choicesEl.setAttribute("class", "btn btn-primary choices");
        quiz.appendChild(choicesEl);
        choicesEl.textContent = choices[i];
        choicesEl.addEventListener("click", (compare));
    }
}

//Check answer and either end game or load next question
function compare(event) {
    var element = event.target;
    if (element.matches("button")) {
        var responseDiv = document.createElement("div");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            responseDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            responseDiv.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length || secondsLeft <= 0) {
        endGame();
    } else {
        renderQuiz();
    }
    quiz.appendChild(responseDiv);
}

//End Game
function endGame() {
    //Set up HTML to only show gameOver content
    welcome.style.display = "none";
    quiz.style.display = "none";
    gameOver.style.display = "block";
    highScore.style.display = "none";

    finalScore.textContent = "End of Quiz. " + "Your score is " + score + "/" + questions.length + "!";
}

//Collect and store initials
submit.addEventListener("click", (function () {
    var newInitials = initials.value;
    var newScore = score;

    var newStorageEntry = {
        initials: newInitials,
        score: newScore
    };

    scoresFromStorage.push(newStorageEntry);

    //add to local storage
    localStorage.setItem("scores", JSON.stringify(scoresFromStorage));

    showScores();
})
);


//show Scores
function showScores() {
    //Set up HTML to only show Score content
    welcome.style.display = "none";
    quiz.style.display = "none";
    gameOver.style.display = "none";
    highScore.style.display = "block";
    scoreSection.innerHTML = "";

    //Print scores
    for (var i = 0; i < scoresFromStorage.length; i++) {
        var scoreEl = document.createElement("p");
        scoreEl.innerText = scoresFromStorage[i].initials + "'s score is " + scoresFromStorage[i].score;
        scoreSection.appendChild(scoreEl)
    }

}

//Clear high scores 
clearScores.addEventListener("click", function () {
    localStorage.clear();
    scoresFromStorage.length = 0;
    showScores()
})

//Start quiz over
goBack.addEventListener("click", function () {
    //Set up HTML to only show quiz content
    welcome.style.display = "block";
    quiz.style.display = "none";
    gameOver.style.display = "none";
    highScore.style.display = "none";
    //reset variables
    questionIndex = 0;
    score = 0;
    secondsLeft = 60;

})

//View High scores
viewScores.addEventListener("click", function () {
    welcome.style.display = "none";
    quiz.style.display = "none";
    gameOver.style.display = "none";
    highScore.style.display = "block";
})