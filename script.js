//Initialize index so that game begins with first question in questions array
var questionIndex = 0;
//Initialize game with a score of 0
var score = 0;
//define total time on timer
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
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];
//Select html to use in functions later
//Select HTML timer elements
var timer = document.querySelector("#timer");
var startTimer = document.querySelector("#start");
//Select HTML elements so they can be used in functions
var welcome = document.querySelector("#welcome");
var quiz = document.querySelector("#quiz");
var gameOver = document.querySelector("#gameOver");
var highScore = document.querySelector("#highScore");
var scores = document.querySelector("#scores");
var question = document.querySelector("#question");
var scoreIndicator = document.querySelector("#scoreIndicator");
var finalScore = document.querySelector("#finalScore");
var records = document.querySelector("#records");
var initials = document.querySelector("#initials");
var goBack = document.querySelector("#goBack");


//Start Timer
    //Event listener to start timer when button is clicked
    startTimer.addEventListener ("click", function () {
        //Set up timer 
        var timerInterval = setInterval(function () { 
            secondsLeft--;
            //Print time left to the screen
            timer.textContent = "Time: " + secondsLeft;
            //When timer reaches 0, tell the user
            if (secondsLeft <= 0) { 
                clearInterval(timerInterval);
                timer.textContent = "You're out of time!!";
            }
        }, 1000);
    //Prints first question after start button is pressed
    render(questionIndex);
    });
//End Timer

//Render function prints questions and choices
function render (questionIndex) { 
    //Clear previous content
    quiz.innerHTML = "";
    newChoices.innerHTML = "";

    //For loop to go through questions
    for (var i = 0; i < questions.length; i ++) {
        //Set newQuestion equal to the question in the array 
        var newQuestion = questions[questionIndex].question;
        //Print question to the page
        quiz.textContent = newQuestion;
        //Set choices equal to the set of choices in the array
        var choices = questions[questionIndex].choices;
        //For each choice
    }
        choices.forEach(function (newChoice) {
            //Create a list item
            var listItem = document.createElement("li");
            //Set the text content 
            listItem.textContent = newChoice;
            //Add ul to quiz
            quiz.appendChild(newChoices);
            //Add li to quiz
            newChoices.appendChild(listItem);
            //Add an eventListener to each item 
            listItem.addEventListener("click", (compare));
        })  
}
//Compare function checks that answer is correct
function compare(event) { 
    var element = event.target;
    if(element.matches("li")) { 
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if(element.textContent == questions[questionIndex].answer) {
            score ++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The correct answer is :" + question[questionIndex].answer;
        }
    }
   questionIndex++;
   
   if (questionIndex >= questions.length) {
       gameOver(); 
       createDiv.textContent= "End of Quiz." + "Your score is " + score + "/" + questions.length + "!";
   } else { 
       render (questionIndex);
   }
   quiz.appendChild(createDiv);
}

//Game over function changes display when game is over
function gameOver() { 
    //Clear previous content
    quiz.innerHTML = "";
    newChoices.innerHTML = "";
}