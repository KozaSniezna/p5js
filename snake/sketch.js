// Snake Game
// Chris Jordan (toferj@gmail.com)
// inspired by Dan Shiffman (http://codingtra.in)
// Coding Challenge #3: The Snake Game (https://youtu.be/AaGK-fj-BAM)
//
// TODO:
// - Add Count Down start (3, 2, 1...GO!)
// - Add longest snake record... without a DB or some sort of online storage, this would only be per game session...
// - It seems impossible to ride along the walls now. Check wall collision detection.
//   (as a stopgap, I just made it where food will never be placed exactly on any wall)
//
// Other possible user controlled settings:
//  - start snake at a random place on the screen
//  - start snake moving in a random direction



var snake, food;
var scaleFactor = 20;
var bg = {
    r: 43,
    g: 43,
    b: 43
};
var settings = {};

function setup() {
    var canvas = createCanvas(600, 700);
    canvas.parent('gameBoard');

    var playAgain = select('#playAgain');
    playAgain.mouseClicked(startOver);

    // read settings
    readSettings();
    frameRate(settings.snakeSpeed);

    // add our snake and our first piece of food...
    snake = new Snake();
    food = new Food();
}

function readSettings(){
    settings = {};
    settings.junkFoodFrequency = select('#dropFrequency').value();
    settings.snakeSpeed = select('#snakeSpeed').value();
    settings.growSpeed = select('#growSpeed').checked();
    settings.debuggingOn = select('#debug').checked();
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            if (snake.yspeed !== 1) {
                snake.move(0, -1);
            }
            break;
        case DOWN_ARROW:
            if (snake.yspeed !== -1) {
                snake.move(0, 1);
            }
            break;
        case LEFT_ARROW:
            if (snake.xspeed !== 1) {
                snake.move(-1, 0);
            }
            break;
        case RIGHT_ARROW:
            if (snake.xspeed !== -1) {
                snake.move(1, 0);
            }
            break;
        default:

    }
}

function draw() {
    background(bg.r, bg.g, bg.b);
    if (snake.eat()) {
        food = new Food();
    }
    snake.update();
    snake.show();
    food.show();
    if (snake.dead()) {
        noLoop();
    }
}

function startOver() {
    // re-read settings in case any have changed...
    readSettings();
    frameRate(settings.snakeSpeed);

    snake = new Snake();
    food = new Food();
    loop();

}
