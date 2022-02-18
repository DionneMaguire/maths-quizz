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
    runGame("addition");
})
/**
 * the main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    
    //creates 2 random numbers between 1 and 10 
    //for question
    let num1 = Math.floor(Math.random() * 10) +1;
    let num2 = Math.floor(Math.random() * 10) +1;

    // randomly pick whether sum is going to be 
    // an addition, subtract, multiply or division
    let numSign = Math.floor(Math.random() * 4);
    let signs = ["+", "-", "*", "/"];
    let signPicked = signs[numSign];
    
    //testing making it be additon
    signPicked = "+";

    if (signPicked === "+") {
        displayAdditionQuestion(num1, num2);
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
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right :D!");
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
    }

    runGame(calculatedAnswer[1]);

}

/**
 * gets the operands (the numbers) and the operator (plus,minus etc)
 * directly from the dom, and returns the correct answer. */
function calculateCorrectAnswer() {
    console.log("in the calculateCorrectAnswer");
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }


}
/** */
function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}