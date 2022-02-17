//* wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    console.log(buttons);
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit");
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
function runGame() {
    
    //creates 2 random numbers between 1 and 10 
    //for question
    let num1 = Math.floor(Math.random() * 10) +1;
    let num2 = Math.floor(Math.random() * 10) +1;
    console.log(num1);
    console.log(num2);

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

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

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