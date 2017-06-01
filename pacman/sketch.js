var pacman;

// game constants
var SCALE = 20;
var SPEED = 0.15;
var UP;
var DOWN;
var LEFT;
var RIGHT;

var showGrid = true;


function setup() {
    // frameRate(1);
    createCanvas(800, 760); // this is the original screen resolution of 224x288 scaled by 1.67

    // set the values of the directional constantsin Radians.
    // this has to be done here because I'm using p5's PI constant,
    // and it's not available until we're in the setup function...
    UP = (270 * PI) / 180;
    DOWN = (90 * PI) / 180;
    LEFT = (180 * PI) / 180;
    RIGHT = (0 * PI) / 180;

    pacman = new Pacman(13);
}

function draw() {
    background(51);
    if (showGrid) {
        push();
        stroke(0, 0, 75);
        noFill();
        for (var x = 0; x < width; x += SCALE) {
            for (var y = 0; y < height; y += SCALE) {
                // line(x,y,x,height);
                rect(x, y, SCALE, SCALE);
            }
        }
        pop();
    }
    pacman.update();

    if (frameCount % 8 > 0 && pacman.mouthOpened) {
        // draw opened mouth...
        pacman.show(pacman.mouthOpened);
    } else if (frameCount % 8 === 0) {
        // draw opened mouth...
        pacman.show(true);
        pacman.mouthOpened = !pacman.mouthOpened;
    } else if (frameCount % 8 > 0 && !pacman.mouthOpened) {
        // draw closed mouth...
        pacman.show(pacman.mouthOpened);
    } else {
        // draw opened mouth...
        pacman.show(true);
    }

}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            pacman.move(0, -SPEED, UP);
            break;
        case DOWN_ARROW:
            pacman.move(0, SPEED, DOWN);
            break;
        case LEFT_ARROW:
            pacman.move(-SPEED, 0, LEFT);
            break;
        case RIGHT_ARROW:
            pacman.move(SPEED, 0, RIGHT);
            break;
        default:
    }
}
