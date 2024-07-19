let myXPos = 100;
let myYPos = 300;
let enemyXPos = 250;
let enemyYPos = 250;
let bullets = []


function setup(){

    createCanvas(800,600);
    rectMode(CENTER);
    
}


function draw(){
    background(0);
    
//Player 1 square
    fill(0,0,255);
    rect(myXPos, myYPos, 30, 80);

    if(keyIsDown(65)){
        myXPos -= 5;
    }

    if(keyIsDown(68)){
        myXPos += 5;
    }

    if(keyIsDown(83)){
        myYPos += 5;
    }

    if(keyIsDown(87)){
        myYPos -= 5;
    }


//myBarrier
    if (myXPos > 400) {
        myXPos = 399;
    }

    if (myXPos < 15){
        myXPos = 15
    }

    if(myYPos < 40){
        myYPos = 40
    }

    if(myYPos > 560){
        myYPos = 560
    }
//end of myBarrier

//Shooting function
if (keyIsDown(32)){//spacebar key
    shootBullet();//calling function to shoot the bullet
}


}
