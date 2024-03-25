//Initalise Tilemap Varibles
// let w = 87; //Codes for the keyboard keys
// let a = 65;
// let s = 83;
// let d = 68;

let tilemap = [];
let numDown = 10;
let numAcross = 10;
let tileSize = 50;
let textures = [];

let graphicMap = [

[1, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 1, 1, 1, 0, 1, 0, 0, 0, 1], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0],   
[0, 1, 1, 1, 0, 1, 0, 0, 0, 0], 
[0, 1, 0, 0, 0, 1, 0, 1, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1], 
[0, 1, 0, 0, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1] 
]



let tileRules = [
[1, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 1, 1, 1, 0, 1, 0, 0, 0, 1], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0],   
[0, 1, 1, 1, 0, 1, 0, 0, 0, 0], 
[0, 1, 0, 0, 0, 1, 0, 1, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1], 
[0, 1, 0, 0, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1]   
]

//INITALISING PLAYER VARIABLES

let player;
let playerSprite;
let playerSpriteRight;
let playerSpriteLeft;
let playerSpriteDown;
let playerSpeed = 5;
let playerSize = tileSize;


let cat, catColor;
let catSprite;
let catSpeed = 2;
let catFriction = 0.5;

let cheese;
//let cat1;
// let cats = [];
// let catSize = 5;
// let catSpeed = 3;
// let numCats = 3;

function preload(){
textures[0] = loadImage("grass3.path.png");
textures[1] = loadImage("hedge.collison.jpg");


playerSprite = loadImage("mouse.up.png");
playerSpriteRight = loadImage("mouse-right.png")
playerSpriteLeft = loadImage("mouse-left.png");
playerSpriteDown = loadImage("mouse-down.png");
catSprite = loadImage("black.cat.png")
// catSprite1 = loadImage("black.cat.png");
//Loading cheese 

cheese = loadImage("cheese.png.png");


}










function setup() {
    createCanvas(500, 500);

    let tileID = 0;

    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            // let x = across * tileSize;
            // let y = down * tileSize;


            let textureNum = graphicMap[down][across];
            tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID);

            tileID++;
        }
    }
    player = new Player(playerSprite,0,3,tileSize, playerSpeed, tileSize, tileRules);
    cat = new Cat(catSprite, 0,0,tileSize,catSpeed,catFriction,tileSize,tileRules);
    //cheese =  new Cheese(cheese,5,5,tileSize,tileSize,tileRules);
  

    //catSprite.attractionPoint(0.1,playerSprite.position.x,playerSprite.position.y);
        
    }



function draw() {
    background(0);
    
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            

            tilemap[across][down].display();
            tilemap[across][down].debug();

        
        }

// keyPressed();

// catSprite.friction = catFriction;

// catSprite.attractionPoint(
//     speedCat,
//     playerSprite.position.x,
//     playerSprite.position.y
// );
// drawSprites();

    }
    player.display();
    player.move();

    cat.followPlayer(player.xPos,player.yPos);
    cat.move();

    cat.display();
}


function keyPressed() {
    player.setDirection();

    if (key==="w"){
        playerSprite.rotation = 0;
        
    }

    if (key==="s"){
        playerSprite.rotation = 180;
    }
    if (key==="a"){
        playerSprite.rotation = -90;
    }
    if (key==="d"){
        playerSprite.rotation = 90; 
}}

class Player {
    constructor(sprite, startAcross, startDown, size, speed, tileSize, tileRules){
        //Attaching sprite to key in object
        this.sprite = sprite;
        //Starting tile info
        this.across = startAcross;
        this.down = startDown;
        //Converting tile coordinates into pixels
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;
        //Size and speed
        this.size = size;
        this.speed = speed;
        //Checking rules/collisions for tile player is moving to
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        //Extra properties used to control player movement and direction
        this.dirX = 0;
        this.dirY = 0;
        //Boolean to determine Whether player is moving or not
        this.isMoving = false;
        //X and Y position of tile player is moving to
        this.tx = this.xPos;
        this.ty = this.yPos;
    
    }

    setDirection(){
        if(!this.isMoving){
                         
            if (key==="w"){
                this.dirX = 0;
                this.dirY = -1;
            }

            if (key==="s"){
                this.dirX = 0;
                this.dirY = 1;
            }
            if (key==="a"){
                this.dirX = -1;
                this.dirY = 0;
            }
            if (key==="d"){
                this.dirX = 1;
                this.dirY = 0;
            }
            this.checkTargetTile();
        
        }
    }
        

    checkTargetTile(){

    //Find out which tile player is currently on     
    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);
    //Calculate coordinates of target tile then check it is in bounds of map
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

    if(
        nextTileHorizontal >= 0 &&
        nextTileHorizontal < numAcross &&
        nextTileVertical >= 0 &&
        nextTileVertical < numDown
    ) {
    //If in bounds set as moveable
    if(this.tileRules[nextTileVertical][nextTileHorizontal] !=1){

    //If walkable then calculate x and y coordinate of target tile

    this.tx = nextTileHorizontal * this.tileSize;
    this.ty = nextTileVertical * this.tileSize;

    //Then we set boolean to true
    this.isMoving = true;
    }
}

}

    move(){
        if(this.isMoving){
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            if(this.xPos === this.tx && this.yPos === this.ty){
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }
    }

    display(){
        imageMode(CORNER);
        image(this.sprite,this.xPos,this.yPos,this.size,this.size);
    }
}

    class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize;
        this.tileID = tileID;
    }

    display() {
    noStroke();
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
    
    debug() {
        //TILE
        noStroke();
        noFill();
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);

        noStroke();
        //fill(255);
        //textAlign(LEFT,TOP);

        text(this.tileID,this.xPos,this.yPos);
        
    }}

class Cat {

    constructor(catSprite, startAcross, startDown,catSpeed,catFriction, size, tileSize, tileRules){
        //Attaching sprite to key in object
        this.catSprite = catSprite;
        //Starting tile info
        this.across = startAcross;
        this.down = startDown;

        this.speed = catSpeed;
        this.friction = catFriction;
        //Converting tile coordinates into pixels
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;
        //Size and speed
        this.size = size;
        //this.speed = speed;
        //Checking rules/collisions for tile player is moving to
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        //Extra properties used to control player movement and direction
        this.dirX = 0;
        this.dirY = 0;
        //Boolean to determine Whether player is moving or not
        this.isMoving = false;
        //X and Y position of tile player is moving to
        this.tx = this.xPos;
        this.ty = this.yPos;

}

followPlayer(playerX,playerY){

    if(this.xPos <playerX){
        this.dirX = 1;
    }
    else if (this.xPos > playerX){
        this.dirX = -1;
    } else {
        this.dirX = 0;
    }

    if(this.yPos<playerY){
        this.dirY =1;
    } else if (this.yPos > playerY){
        this.dirY = -1;
    } else {
        this.dirY = 0;
    }
    }


move(){

    this.xPos += this.speed * this.dirX;
    this.yPos += this.speed * this.dirY;
}

display(){
    console.log("cat's xPos = ", this.xPos, "Cat's yPos = ", this.yPos)
    imageMode(CORNER);
    image(this.catSprite,this.xPos, this.yPos, this.size,this.size);
}

// class Cheese {
//     constructor(x,y,s){
//         this.x = x;
//         this.y = y;
//         this.s = s;
//     }
// display(){
//     translate(this.x,this.y)
//     scale(this.s)
//     image(cheese,0,0)
// }
}
        
        //CONVERT SINGLE DIGIT NUMBERS TO TWO-DIGIT NUMBERS
        //Convert all one-digit tileIDs to two-digit (i.e. 0 becomes 00, 1 becomes 01, 2 becomes 01 etc.).
        // //This is so the first digit is the X axis and the second digit is the Y axis.
        // let twoDigitTileID;
        // if (this.tileID < 10) {
        //     twoDigitTileID = "0" + this.tileID;
        // } else {
        //     twoDigitTileID = this.tileID;
        // }
    


        //LABEL

