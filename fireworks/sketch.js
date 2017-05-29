var fireworks = [];
var gravity;
var wind;

function setup() {
    colorMode(RGB);
    // createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    stroke(255);
    strokeWeight(4);
    wind = createVector(0,0); // wind blowing in from the left...
    gravity = createVector(0, 0.2);
    background(0);
}

function draw() {
    background(0, 50);
    if (random(1) < 0.075) {
        fireworks.push(new Firework());
    }
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();
        if (fireworks[i].isSpent()) {
            fireworks.splice(i, 1);
        }
    }
}
