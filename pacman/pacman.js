function Pacman(r) {
    var cols = floor(width / SCALE);
    var rows = floor(height / SCALE);
    var vc = 0; // vertex count
    var r2 = r;

    this.pos = createVector(floor(cols / 2), floor(rows / 2) + (SCALE / 2)); // + SCALE/2 nudges him down onto the grid...
    this.pos.mult(SCALE);
    this.dir = LEFT;
    this.r = r; // our original r value...
    this.clr = {
        r: 245,
        g: 245,
        b: 0
    }

    this.xspeed = 0;
    this.yspeed = 0;

    this.mouthOpened = true;

    // gather the verticies for both the opened and closed mouth
    this.verticies = {};
    this.verticies.openedMouth = [];
    this.verticies.closedMouth = [];
    for (var a = 0; a < TWO_PI; a += (TWO_PI / 100)) {
        vc++;
        if (vc >= 92 || vc <= 10) {
            r2 = 0;
        } else {
            r2 = this.r;
        }
        // convert polar to cartesian coordinates
        var x1 = r2 * cos(a);
        var y1 = r2 * sin(a);
        this.verticies.openedMouth.push(createVector(x1, y1));
    }
    for (var a = 0; a < TWO_PI; a += (TWO_PI / 100)) {
        // convert polar to cartesian coordinates
        var x1 = this.r * cos(a);
        var y1 = this.r * sin(a);
        this.verticies.closedMouth.push(createVector(x1, y1));
    }
}

Pacman.prototype.move = function(x, y, dir) {
    // dir is the number of Radians to rotate
    this.dir = dir;
    this.xspeed = x;
    this.yspeed = y;

};

Pacman.prototype.update = function() {

    this.pos.x += this.xspeed * SCALE;
    this.pos.y += this.yspeed * SCALE;

    this.pos.x = constrain(this.pos.x, this.r, width - this.r);
    this.pos.y = constrain(this.pos.y, this.r, height - this.r);

};

Pacman.prototype.show = function(opened) {
    fill(this.clr.r, this.clr.g, this.clr.b);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y + (SCALE / 2));
    rotate(this.dir);
    if (opened) {
        beginShape();
        for (var i = 0; i < this.verticies.openedMouth.length; i++) {
            vertex(this.verticies.openedMouth[i].x, this.verticies.openedMouth[i].y)
        }
        endShape(CLOSE);
    } else {
        beginShape();
        for (var i = 0; i < this.verticies.closedMouth.length; i++) {
            vertex(this.verticies.closedMouth[i].x, this.verticies.closedMouth[i].y)
        }
        endShape(CLOSE);
    }
    pop();
}
