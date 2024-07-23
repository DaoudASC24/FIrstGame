/*
 if you wanna update
git add . (to add all new files)
git commit -m "message of change"
git push
*/


let spaceship;
let message1 = "Game Over: Blue Wins"
let message2 = "Game Over: Red Wins"
let myXPos = 100;
let myYPos = 300;
let myBullets = [];
let myRightBullet; //for collison with the front of bullet
let myTop, myBottom, myRight; //we dont need a myLeft because bullets wont come from behind
let enemyXPos = 700
let enemyYPos = 300
let enemyBullets = [];
let enemyLeftBullet; //for collision with the front of bullet
let enemyTop, enemyBottom, enemyLeft; //we dont need an enemy Right because bullets wont come from behind

let gameState = 'welcome'; // 'welcome', 'game', 'gameOver'
let gameOverMessage = "";
let gameOverTime = 0;

function setup() {
    createCanvas(800, 600);
    rectMode(CENTER);
}

function draw() {
    background(0);

    function drawTitle() {
    fill(255);
    textSize(60);
    textAlign(CENTER, CENTER);
    text("Space Shooter", width / 2, height / 4);
}
    
    if (gameState === 'welcome') {
        drawWelcomeScreen();
    } else if (gameState === 'game') {
        drawGame();
    } else if (gameState === 'gameOver') {
        drawGameOverScreen();
    }
}

function drawWelcomeScreen() {
    background(0);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(0,255,255)
    text("Space Shoota:", width / 2, height / 4);
    text("Play", width / 2, height / 2);
}

function drawGame() {
//___________________________Collision theory______________________//
    // Draw and update Player 1 bullets
    for (let i = myBullets.length - 1; i >= 0; i--) {
        let myBullet = myBullets[i];
        fill(100, 5, 255);
        rect(myBullet.x, myBullet.y, myBullet.width, myBullet.height);
        // Check for collision with Player 2
        if (
            myBullet.x > enemyXPos - 15 &&
            myBullet.x < enemyXPos + 15 &&
            myBullet.y > enemyYPos - 40 &&
            myBullet.y < enemyYPos + 40
        ) {
            // Player 2 is hit
            enemyXPos = 10000; // Move Player 2 off-screen
            enemyYPos = -10000;
            myBullets.splice(i, 1);
            gameOver("Blue Wins");
        }
    }
    // Draw and update Enemy bullets
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        let enemyBullet = enemyBullets[i];
        enemyBullet.x -= enemyBullet.speed; // Move bullet
        fill(200, 5, 75);
        rect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height);
        // Check for collision with Player 1
        if (
            enemyBullet.x > myXPos - 15 &&
            enemyBullet.x < myXPos + 15 &&
            enemyBullet.y > myYPos - 40 &&
            enemyBullet.y < myYPos + 40
        ) {
            // Player 1 is hit
            myXPos = -100000; // ths moves Player 1 off-screen
            myYPos = -100000;
            enemyBullets.splice(i, 1);
            gameOver("Red Wins");
        }
    }
//_____________________________________________________//
    for (let myBullet of myBullets) {
        myBullet.x += myBullet.speed; //this makes the 'illusion' of the bullet moving. In the draw function later on I established bullet.speed
        fill(100,5,255);
        rect(myBullet.x, myBullet.y, myBullet.width, myBullet.height);//the "bullet.blahblah" is established later in the draw loop
    }
    for (let enemyBullet of enemyBullets){
        enemyBullet.x -= enemyBullet.speed;
        fill(200,5,75)
        rect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height);
    }
//Player 1 square
    fill(0, 0, 255);
    rect(myXPos, myYPos, 30, 80);
    if (keyIsDown(65)) { // A key
        myXPos -= 5;
    }
    if (keyIsDown(68)) { // D key
        myXPos += 5;
    }
    if (keyIsDown(83)) { // S key
        myYPos += 5;
    }
    if (keyIsDown(87)) { // W key
        myYPos -= 5;
    }
//Player2 square
    fill(255,0,0);
    rect(enemyXPos, enemyYPos, 30, 80);
if (keyIsDown(LEFT_ARROW)) { // Left arrow key
    enemyXPos -= 5;
}
if (keyIsDown(RIGHT_ARROW)) { // Right arrow key
    enemyXPos += 5;
}
if (keyIsDown(DOWN_ARROW)) { // Down arrow key
    enemyYPos += 5;
}
if (keyIsDown(UP_ARROW)) { // Up arrow key
    enemyYPos -= 5;
}
//Player1 Boundaries
 if (myXPos > 385) {
    myXPos = 385;
}
if (myXPos < 15) {
    myXPos = 15;
}
if (myYPos < 40) {
    myYPos = 40;
}
if (myYPos > 560) {
    myYPos = 560;
}
// Player 2 boundaries
if (enemyXPos < 415) {
    enemyXPos = 415;
}
if (enemyXPos > 785) {
    enemyXPos = 785;
}
if (enemyXPos < 15) {
    enemyXPos = 15;
}
if (enemyYPos < 40) {
    enemyYPos = 40;
}
if (enemyYPos > 560) {
    enemyYPos = 560;
}
}

function drawGameOverScreen() {
    background(0);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text(gameOverMessage, width / 2, height / 2 - 50);
    text("Play Again", width / 2, height / 2 + 50);

    if (millis() - gameOverTime > 3000) {
        gameState = 'welcome';
    }
}

//__________________The bullets__________________________________________//
//Bullet trigger Space and Shift
function keyPressed() {
    if (gameState === 'game') {
        if (keyCode === 32) { // spacebar key
            shootMyBullet(); // calling function to shoot the bullet
        }
        if (keyCode === 16) { // shift key
            shootEnemyBullet();
        }
    }
}

// Function to shoot a bullet
function shootMyBullet() {
    myBullets.push({ // Add a new bullet object to the bullets array
        x: myXPos + 30, // This sets the bullets X position to the right side of the player
        y: myYPos, // Setting the bullets Y position to the center of the player
        width: 20, // Width of the bullet
        height: 10, // Height of bullet
        speed: 12 // Speed that the bullet moves
    });
}

function shootEnemyBullet() {
    enemyBullets.push({
        x: enemyXPos - 30,
        y: enemyYPos,
        width: 20,
        height: 10,
        speed: 7
    });
}

//____________End of the bullets____________//

function mousePressed() {
    if (gameState === 'welcome') {
        gameState = 'game';
    } else if (gameState === 'gameOver') {
        resetGame();
        gameState = 'game';
    }
}

function gameOver(winner) {
    gameState = 'gameOver';
    gameOverMessage = `Game Over: ${winner}`;
    gameOverTime = millis();
}

function resetGame() {
    myXPos = 100;
    myYPos = 300;
    myBullets = [];
    enemyXPos = 700;
    enemyYPos = 300;
    enemyBullets = [];
}
