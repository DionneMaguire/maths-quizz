//* wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    console.log(buttons);
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                alert("there is a problem!!");
            }
        })
    }

    // if the user hits enter it will check answer

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    runGame("addition");
})
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
 *Checks the answer against the first element in
 * the returned calculateCorrectAnswer
 */
function checkAnswer() {
    //check whether this is first time thru and if it is start the timer
    let seconds = parseInt(document.getElementById("timer").innerHTML);
    //console.log(seconds);
    if (seconds === 30) {
        timeLeft(seconds);
    }
    setTimeout(function() {
        console.log("in timeout");
        alert("Time's up!");

    }, 30000);

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right :D!");
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
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

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 * operand2; 
    document.getElementById('operand2').textContent = operand1;
    document.getElementById('operator').textContent = "/";

}

function timeLeft(seconds) {
    console.log("in the timeLeft");
    let countDown = setInterval(function() {
        document.getElementById("timer").innerHTML = seconds; //access the timer HTML text to display the number counting down
        seconds--;
        if (seconds === -1) {
            console.log("game over");
        }
    }, 1000);
}

function displayResults() {
    displayResults.style.display = "block";
    let finalCorrect = parseInt(document.getElementById("score").innerText);
    let finalIncorrect = parseInt(document.getElementById("incorrect").innerText);
    console.log(finalCorrect);
    console.log(finalIncorrect);
    document.getElementById("final-score").innerHTML = finalCorrect;
    document.getElementById("final-incorrect").innerHTML = finalIncorrect;
    alert("game ended!");
    reset();

}

function reset() {


}