class timeOver extends Phaser.Scene {
    constructor() {
        super("timeoverScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'buildingimage').setOrigin(0);
        //score = 0;
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '36px',

                color: '#FFFF',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Time ran out.. Player 1 wins', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        //this.ScoreField = this.add.text(game.config.width/2, game.config.height/2, 'Score: ' + Math.round(score), menuConfig).setOrigin(0.5);
 
        menuConfig.color = '#FFFF';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 2*borderPadding, 'Press ← Restart', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        

    }
    update() {
        //this.ScoreField.txt = 'Score: ' + Math.round(score);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        
      }
}