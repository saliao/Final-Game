class tutorial extends Phaser.Scene {
  constructor() {
      super("tutorialScene");
  }

  preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }
  create() {
      this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'tutorial').setOrigin(0);
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
      
      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      

  }
  update() {
      
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode

        this.sound.play('sfx_select');
        this.scene.start('menuScene');    
      }

    }
}