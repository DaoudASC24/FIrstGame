/*
 if you wanna update

git add . (to add all new files)
git commit -m "message of change"
git push
*/

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












     // Update and draw bullets
     if (bullets.length > 0) { // Check if there are bullets to update
        bullets[0].x += bullets[0].speed; // Move bullet horizontally
        fill(255, 0, 0); // Set fill color to red for bullets
        rect(bullets[0].x, bullets[0].y, bullets[0].w, bullets[0].h); // Draw bullet
        
        // Remove bullet that is off-screen
        if (bullets[0].x > width) { // If bullet moves beyond the canvas width
            bullets.splice(0, 1); // Remove the bullet from the array
        }
    }
}


// Function to shoot a bullet
function shootBullet() {
    if (bullets.length === 0) { // Only shoot if there are no existing bullets
        bullets.push({ // Add a new bullet object to the bullets array
            x: myXPos + 30, // Set bullet X position to the right side of the player
            y: myYPos, // Set bullet Y position to the center of the player
            w: 10, // Width of the bullet
            h: 5, // Height of the bullet
            speed: 7 // Speed at which the bullet moves
        });
    }
}



