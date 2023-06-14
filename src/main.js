//Samuel Liao, saliao
//Game: Apartment Spy
/*
## Game Rules and Goals
This is a two player game where one player is the seeker and the other one is a spy or fake resident.  The goal for the seeker is to observe each reseident and guess which resident is the correct spy. While the spy or fake resident's goal is to survive for 30 seconds without getting caught.  
## Controls
The round will not start yet, or residents don't move yet until someone press key 'S'. Make sure player 1 selects his character first then player 2 presses 'S'.
### For Player 1(Spy)
* Press keys 1,2,3, or 4 to choose your character (make sure player 2 does not look)
* Press left and right arrow keys to move your character when round starts (arrow keys on keypad also).
* Tip: player 2 might be able to look at your hand while you press keys move, so try to cover it.
### For Player 2(Seeker)
* Mouse click on a character or resident to have camera zoom in and follow him.
* While zoomed in on character, press 'F' to guess him.  You only get one try.
* Press Q to zoom out and stop following character.
* Note: player 2 should no look at player's hand while he is press the keys.
### 
* Phaser components: Physics/Collision, Camera zoom and follow, animation(in progress), tilemap, text objects. *All in play.js
*/

let config = {
    type: Phaser.AUTO,
    //width: 640,
    //height: 480,
    render: {
        pixelArt: true
    },
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    scene: [ Menu, play, gameOver, tutorial, credits, player2wins,timeOver]

}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, key1, key2, key3, key4, keyS, keyQ;
let clickedtarget = "";
const tileSize =35*1.2;
const SCALE = 0.5;
// set UI sizes
let player1 = "resident4";
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let cursors;
let score = 0;
let highscore = 0;
