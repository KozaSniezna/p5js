function Snake() {
    var cols = floor(width / scaleFactor);
    var rows = floor(height / scaleFactor);
    this.pos = createVector(floor(cols / 2) * scaleFactor, floor(rows / 2) * scaleFactor);
    if (random(1) < 0.5) {
        this.xspeed = 0;
        this.yspeed = 0;
    } else {
        this.xspeed = 0;
        this.yspeed = 0;
    }

    this.totalEaten = 0;
    this.tail = [];
    this.isDead = false;
    this.snakeSpeed = settings.snakeSpeed;
    this.justAteJunk = false;
};

Snake.prototype.move = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
};

Snake.prototype.eat = function() {
    // check to see if we've eaten food or not...
    var d = dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y);
    if (d < 1) {
        if (food.junkFood) {
            this.totalEaten--;
            this.tail.splice(0, 1);
        } else {
            this.totalEaten++;
            if (settings.growSpeed) {
                this.snakeSpeed += 0.5;
                this.snakeSpeed = constrain(this.snakeSpeed, 5, 30);
                // update the frameRate to inscrease the snake's speed.
                frameRate(this.snakeSpeed);
            }
        }
        return true;
    } else {
        return false;
    }
};

Snake.prototype.dead = function() {
    var d;
    // check for wall collision...
    if (this.pos.x < scaleFactor || this.pos.x > width - (scaleFactor * 2) || this.pos.y < scaleFactor || this.pos.y > height - (scaleFactor * 2)) {
        this.isDead = true;
        // let's color the head of the snake red indicating our collision visually...
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y, scaleFactor, scaleFactor);
    }
    // if we haven't detected a collision with any of the four walls... then check for collisions with our own tail...
    if (!this.isDead) {
        for (var i = 0; i < this.tail.length; i++) {
            // check for self-collision...
            d = dist(this.pos.x, this.pos.y, this.tail[i].x, this.tail[i].y);
            if (d < scaleFactor) {
                this.isDead = true;
                // let's color the head of the snake red indicating our collision visually...
                fill(255, 0, 0);
                rect(this.pos.x, this.pos.y, scaleFactor, scaleFactor);
                // we found a collision! no need to keep checking.
                // break out and return collision.
                break;
            }
        }
    }
    return this.isDead;
};

Snake.prototype.update = function() {
    for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
    }
    if (this.totalEaten >= 1) {
        this.tail[this.totalEaten - 1] = createVector(this.pos.x, this.pos.y);
    }

    this.pos.x += this.xspeed * scaleFactor;
    this.pos.y += this.yspeed * scaleFactor;

    this.pos.x = constrain(this.pos.x, 0, width - scaleFactor);
    this.pos.y = constrain(this.pos.y, 0, height - scaleFactor);
};

Snake.prototype.show = function() {
    fill(255);
    for (var i = this.tail.length - 1; i >= 0; i--) {
        rect(this.tail[i].x, this.tail[i].y, scaleFactor, scaleFactor);
        if (settings.debuggingOn) {
            push();
            fill(0);
            textSize(14);
            textAlign(CENTER, CENTER);
            text(i, this.tail[i].x, this.tail[i].y, scaleFactor, scaleFactor);
            pop();
        }
    }
    rect(this.pos.x, this.pos.y, scaleFactor, scaleFactor);
};
