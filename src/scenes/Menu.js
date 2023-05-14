class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image("MenuBackground", "./assets/MenuBackground.png");
        this.load.image("gameover", "./assets/gameOverbackground.png");
        this.load.image("tutorial", "./assets/Tutorialback.png");
        this.load.image("credits", "./assets/creditsBackground.png");
        this.load.audio('beats', './assets/itty-bitty-8-bit.mp3');
        this.load.audio('flap', './assets/flap.mp3');
        this.load.audio('quack', './assets/quack.mp3');
        this.load.audio('bawk', './assets/bawk.wav');
        this.load.audio('caw', './assets/caw.mp3');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
      this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'MenuBackground').setOrigin(0);
        score = 0;
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '28px',
            
                color: '#FFFFF',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'HIGH SCORE: '+ Math.round(highscore), menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press ← to play', menuConfig).setOrigin(0.5);
       
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press → for tutorial', menuConfig).setOrigin(0.5);
        this.add.text(20, game.config.height - 3*borderPadding, 'Press ↑ for credits', menuConfig).setOrigin(0);//↑
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    }
    update() {
        //this.highscore = highscore;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode

          this.sound.play('sfx_select');
          this.scene.start('runnerScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode

          this.sound.play('sfx_select');
          this.scene.start('tutorialScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // hard mode

          this.sound.play('sfx_select');
          this.scene.start('creditsScene');    
        }
      }
}