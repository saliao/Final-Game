//Samuel Liao, saliao
//Game: Chicken Rush
//Hours spend: 20-24
//Creative Tilt: I implemented a shooting mechanic also to my endless runner.  I also think my visual design is creative and refreshing because it's very comedic.
let config = {
    type: Phaser.AUTO,
    //width: 640,
    //height: 480,
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

    scene: [ Menu, Runner, gameOver, tutorial, credits]

}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP;
const tileSize =35*1.2;
const SCALE = 0.5;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let cursors;
let score = 0;
let highscore = 0;
