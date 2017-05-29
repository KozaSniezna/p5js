function Firework() {
    this.exploded = false;
    this.particles = [];
    this.firework = new Particle(random(100, (width - 100)), height, true);
}

Firework.prototype.isSpent = function() {
    return (this.exploded && this.particles.length == 0);
}

Firework.prototype.update = function() {
    if (!this.exploded) {
        this.firework.applyForce(gravity);
        this.firework.applyForce(wind);
        this.firework.update();
        if (this.firework.vel.y >= 0) {
            this.exploded = true;
            this.explode();
        }
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity);
        this.particles[i].applyForce(wind);
        this.particles[i].update();
        if (this.particles[i].isSpent()) {
            this.particles.splice(i, 1);
        }
    }
}

Firework.prototype.show = function() {
    if (!this.exploded) {
        this.firework.show();
    }
    for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].show();
    }
}

Firework.prototype.explode = function() {
    if (random(1) < 0.7) {
        for (var i = 0; i < 75; i++) {
            this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false));
        }
    } else {
        // this turns out to be about 97 points...
        for (var t = 0; t <= TWO_PI; t += 0.065) {
            var x = (16 * pow(sin(t), 3)) * -1;
            var y = (13 * cos(t) - 5 * cos(t * 2) - 2 * cos(t * 3) - cos(t * 4)) * -1
            this.particles.push(new Particle(x, y, false, true, this.firework.pos.x, this.firework.pos.y));
        }
    }
}
