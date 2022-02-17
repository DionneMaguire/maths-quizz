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
})
/**
 * the main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame() {
    //creates 2 random numbers between 1 and 10
    let num1 = Math.floor(Math.random() * 10) +1;
    let num2 = Math.floor(Math.random() * 10) +1;


}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}