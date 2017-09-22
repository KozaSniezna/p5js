
function setup() {
    createCanvas(600,600);
    angleMode(DEGREES);

}

function draw() {
    background(51);
    translate(300,300);
    rotate(-90);
    let hr = hour();
    let mn = minute()
    let sc = second();
    // let sw = map(sc, 0, 60, 1, 6);
    let sw = 1;
    let zoom = map(sc/2, 0, 30, 0.5, 1.5);
    let hColor = floor(map(hr%12, 0, 12, 50, 255));
    let mColor = floor(map(mn, 0, 60, 50, 255));
    let sColor = floor(map(sc, 0, 60, 50, 255));

    scale(1.5);
    stroke(255);
    push();
        noFill();
        stroke(255);
        ellipse(0,0,100,100);

        stroke(255,0,175);
        ellipse(0,0,325,325);

        stroke(100,255,75);
        ellipse(0,0,250,250);

        stroke(25,175,255);
        ellipse(0,0,175,175);
    pop();


    // every hour (12) is an arc of 30 degrees
    push();
        noFill();
        stroke(hColor,mColor,sColor);
        strokeWeight(sw);
        let hrsStart = map(hr%12, 0, 12, 0, 360);
        arc(0,0,175,175,hrsStart-15,hrsStart+15);
    pop();


    // minutes
    // every minute is an arc of 6 degrees
    push();
        noFill();
        stroke(hColor,mColor,sColor);
        strokeWeight(sw);
        let minStart = map(mn, 0, 60, 0, 360);
        arc(0,0,250,250,minStart-3,minStart+3);
    pop();


    // seconds
    // every second is an arc of 6 degrees
    push();
        noFill();
        stroke(hColor,mColor,sColor);
        strokeWeight(sw);
        let secStart = map(sc, 0, 60, 0, 360);
        arc(0,0,325,325,secStart-3,secStart+3,PIE);
    pop();


    push();
    rotate(90);
    // fill(hColor,mColor,sColor);
    fill(255);
    noStroke();
    let ampm = 'am';
    if(hr > 12){
        hr -= 12;
        ampm = 'pm';
    }
    if(mn < 10){
        mn = '0'+mn;
    }
    if(sc < 10){
        sc = '0'+sc;
    }
    // text(hr+":"+mn+":"+sc+' '+ampm, 125, 175);
    text(hr+":"+mn+":"+sc+' '+ampm, -30, 5);
    text(hColor+','+mColor+','+sColor, 125, 190);
    pop();
}
