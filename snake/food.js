Food = function() {
    var cols = floor(width / scaleFactor); // 30
    var rows = floor(height / scaleFactor); //35
    // we may want to consider at some point not allowing food to be placed
    // ON the snake's tail... in testing it has happend once or twice, but
    // not often.
    this.pos = createVector(floor(random(scaleFactor, cols)), floor(random(scaleFactor, rows)));
    this.pos.mult(scaleFactor);
    // this will keep the food from being placed directly against a wall... it's either
    // this or I need to fix the collision detection... :(
    this.pos.x = constrain(this.pos.x, scaleFactor, (width - (scaleFactor * 2)));
    this.pos.y = constrain(this.pos.y, scaleFactor, (height - (scaleFactor * 2)));

    this.junkFood = false;

    if (random(1) < (settings.junkFoodFrequency / 100) && snake.totalEaten > 0) {
        this.junkFood = true;
    }
};

Food.prototype.show = function() {
    push();
    noStroke();
    if (this.junkFood) {
        fill(204, 153, 51);
    } else {
        fill(51, 204, 77);
    }
    rect(this.pos.x, this.pos.y, scaleFactor, scaleFactor);
    pop();
};
