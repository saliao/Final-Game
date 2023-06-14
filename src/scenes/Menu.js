class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image("MenuBackground", "./assets/MenuBackground.png");
        this.load.image("sky", "./assets/sky.png");
        this.load.image("gameover", "./assets/gameOverbackground.png");
        this.load.image("tutorial", "./assets/Tutorialback.png");
        this.load.image("credits", "./assets/creditsBackground.png");
        
        
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
        menuConfig.fontSize = '40px'
        this.creditsbutton = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 10*borderPadding, 'CREDITS', menuConfig).setOrigin(0.5);
        this.playbutton =this.add.text(game.config.width/2, game.config.height/2 - 50, 'PLAY', menuConfig).setOrigin(0.5);
       
        menuConfig.color = '#000';
        this.tutorialbutton = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding-150, 'TUTORIAL', menuConfig).setOrigin(0.5);
        //this.add.text(20, game.config.height - 3*borderPadding, 'CREDITS', menuConfig).setOrigin(0);//↑
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.Sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0)
        this.Sky.setDepth(-110);

        //Adding button functions
        this.tutorialbutton.setInteractive()
        this.tutorialbutton.on('pointerover',function(pointer){
          //this.scene.sound.play('sfx_select');
          //this.setFrame(1);
          this.setTintFill(0xffffff);
          //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
          //this.setTint(this.scene.tint);
          //this.set
          console.log(0xffffff)
      })
      
      this.tutorialbutton.on('pointerout',function(pointer){
          //this.setFrame(0);
          this.clearTint();
          console.log('pointer off')
      })

      this.tutorialbutton.on('pointerdown',function(pointer){
        //this.setFrame(0);
        //this.clearTint();
        this.scene.scene.start('tutorialScene');
        console.log('pointer off')
        //this.scene.sound.play('sfx_select');
    })
  //playButton
    this.playbutton.setInteractive();
    this.playbutton.on('pointerover',function(pointer){
      //this.scene.sound.play('sfx_select');
      //this.setFrame(1);
      this.setTintFill(0xffffff);
      //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
      //this.setTint(this.scene.tint);
      //this.set
      console.log(0xffffff)
  })
    this.playbutton.on('pointerout',function(pointer){
      //this.setFrame(0);
      this.clearTint();
      console.log('pointer off')
  })

  this.playbutton.on('pointerdown',function(pointer){
    //this.setFrame(0);
    //this.clearTint();
    this.scene.scene.start('playScene');
    console.log('pointer off')
    //this.scene.sound.play('sfx_select');
    })
    //creditsButton
    this.creditsbutton.setInteractive();
    this.creditsbutton.on('pointerover',function(pointer){
      //this.setFrame(1);
      this.setTintFill(0xffffff);
      //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
      //this.setTint(this.scene.tint);
      //this.set
      console.log(0xffffff)
  })
    this.creditsbutton.on('pointerout',function(pointer){
      //this.setFrame(0);
      this.clearTint();
      console.log('pointer off')
  })

  this.creditsbutton.on('pointerdown',function(pointer){
    //this.setFrame(0);
    //this.clearTint();
    this.scene.scene.start('creditsScene');
    console.log('pointer off')
    })
    
    }
    
    update() {
      this.Sky.tilePositionX -= 0.1;
        //this.highscore = highscore;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode

          this.sound.play('sfx_select');
          this.scene.start('playScene');    
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