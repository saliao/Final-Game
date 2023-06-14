class credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
  
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'credits').setOrigin(0);
        //score = 0;
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '36px',
  
                color: '#000',
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
        this.Sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0)
        this.Sky.setDepth(-110);
        this.returnbutton = this.add.text(20, game.config.height - 3*borderPadding-20, 'RETURN', menuConfig).setOrigin(0);//
    //Adding button functions
    this.returnbutton.setInteractive()
    this.returnbutton.on('pointerover',function(pointer){
      //this.scene.sound.play('sfx_select');
      //this.setFrame(1);
      this.setTintFill(0xffffff);
      //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
      //this.setTint(this.scene.tint);
      //this.set
      console.log(0xffffff)
  })
  
  this.returnbutton.on('pointerout',function(pointer){
      //this.setFrame(0);
      this.clearTint();
      console.log('pointer off')
  })

  this.returnbutton.on('pointerdown',function(pointer){
    //this.setFrame(0);
    //this.clearTint();
    this.scene.scene.start('menuScene');
    console.log('pointer off')
    //this.scene.sound.play('sfx_select');
})
  
    }
    update() {
        this.Sky.tilePositionX -= 0.1;
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
  
          this.sound.play('sfx_select');
          this.scene.start('menuScene');    
        }
  
      }
  }