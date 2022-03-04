//* wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // when user clicks on start quiz
    let start = document.getElementById("start");
    let intro = document.getElementById("intro");
    start.addEventListener("click", function() {
        intro.style.display = "none";
        startTime();
    //that the cursor will be in the answer box when page is loaded
        document.getElementById("answer-box").focus();

    });
    
    // when user hits the submit answer button it will check answer
    let answer = document.getElementById("answer-button");
    answer.addEventListener("click", function () {
        checkAnswer();
    });

    // if the user hits enter it will check answer

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    runGame("addition");

    //when the user hits the retry button
    let retry = document.getElementById("retry");
    retry.addEventListener("click", function() {
        reset();
    });
});
/**
 * the main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    //each time function is called it will set the value
    //of our answer box to an empty string

    document.getElementById("answer-box").value = "";

    //that the cursor will be in the answer box when page is loaded

    document.getElementById("answer-box").focus();
    
    //creates 2 random numbers between 1 and 10 
    //for question
    let num1 = Math.floor(Math.random() * 10) +1;
    let num2 = Math.floor(Math.random() * 10) +1;

    // randomly pick whether sum is going to be 
    // an addition, subtract, multiply or division
    let numSign = Math.floor(Math.random() * 4);
    let signs = ["+", "-", "*", "/"];
    let signPicked = signs[numSign];

    if (signPicked === "+") {
        displayAdditionQuestion(num1, num2);
    } else if (signPicked === "*") {
        displayMultiplyQuestion(num1, num2);
    } else if (signPicked === "-") {
        displaySubtractQuestion(num1, num2);
    } else if (signPicked === "/") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown operator: ${signPicked}`);
        throw `Unknown operator: ${signPicked}.Aborting!`;
    }

}

/**
 * sets a timer for 30 seconds and when times up displays results
 */
function startTime() {
    //check whether this is first time thru and if it is start the timer
    let seconds = parseInt(document.getElementById("timer").innerHTML);
    if (seconds === 30) {
        timeLeft(seconds);
    }
    setTimeout(function() {
        displayResults();

    }, 30000);
}

/**
 *Checks the answer against the first element in
 * the returned calculateCorrectAnswer
 */
function checkAnswer() {
    
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
/*        alert("Hey! You got it right :D!");*/
        incrementScore();
    } else {
/*        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);*/
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);

}

/**
 * gets the operands (the numbers) and the operator (plus,minus etc)
 * directly from the dom, and returns the correct answer. */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }


}

/**
 * Gets the current score from the dom and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current incorrect score from the dom and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays the addition question
 */
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

/**
 * Displays the subtraction question
 */
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

/**
 * Displays the multipliaction question
 */
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";
}

/**
 * Displays the division question
 */
function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 * operand2; 
    document.getElementById('operand2').textContent = operand1;
    document.getElementById('operator').textContent = "/";
}

/**
 * returns the time remaining
 */
function timeLeft(seconds) {
    let countDown = setInterval(function() {
        document.getElementById("timer").innerHTML = seconds; //access the timer HTML text to display the number counting down
        seconds--;
        if (seconds === -1) {
            clearInterval(countDown);
        }
    }, 1000);
}

/**
 * When time is up, results modal is shown with how many correct and incorrect answers
 * in the 30 seconds
 */
function displayResults() {
    let results = document.getElementById("results");
    
    let finalCorrect = parseInt(document.getElementById("score").innerText);
    let finalIncorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("final-score").innerHTML = finalCorrect;
    document.getElementById("final-incorrect").innerHTML = finalIncorrect;
    results.style.display = "block";

}
/** 
 * resets scores to zero, timer to 30, hides result modal and shows intro modal
 */
function reset() {
    console.log("in reset");
    document.getElementById("score").innerText = 0;
    document.getElementById("incorrect").innerText = 0;
    document.getElementById("timer").innerHTML = 30;
    // set results modal to hide
    document.getElementById("results").style.display = "none";
    // set intro modal to show
    document.getElementById("intro").style.display = "block";
}