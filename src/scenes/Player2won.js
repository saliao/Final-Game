class player2wins extends Phaser.Scene {
    constructor() {
        super("p2wonScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        this.Sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0)
        this.Sky.setDepth(-110);
        //this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'buildingimage').setOrigin(0);
       // this.Rooms = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'rooms').setOrigin(0)
        //this.Rooms.setDepth(-100);
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Nice Guess! Player 2 wins', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        //this.ScoreField = this.add.text(game.config.width/2, game.config.height/2, 'Score: ' + Math.round(score), menuConfig).setOrigin(0.5);
 
        menuConfig.color = '#000';
        this.Restart = this.add.text(game.config.width/2-80, game.config.height/2 + borderUISize + 2*borderPadding -50, 'Restart', menuConfig).setOrigin(0.5);
        this.Menu =this.add.text(game.config.width/2+80, game.config.height/2 + borderUISize + 2*borderPadding-50, 'Menu', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //this.guy1= this.add.sprite(game.config.width/2, game.config.height/2 + borderUISize+100 + 2*borderPadding-50, player1).setOrigin(0.5);
        //Adding button functions
        this.Menu.setInteractive()
        this.Menu.on('pointerover',function(pointer){
          //this.scene.sound.play('sfx_select');
          //this.setFrame(1);
          this.setTintFill(0xffffff);
          //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
          //this.setTint(this.scene.tint);
          //this.set
          console.log(0xffffff)
      })
      
      this.Menu.on('pointerout',function(pointer){
          //this.setFrame(0);
          this.clearTint();
          console.log('pointer off')
      })

      this.Menu.on('pointerdown',function(pointer){
        //this.setFrame(0);
        //this.clearTint();
        this.scene.scene.start('menuScene');
        console.log('pointer off')
        //this.scene.sound.play('sfx_select');
    })
  //playButton
    this.Restart.setInteractive();
    this.Restart.on('pointerover',function(pointer){
      //this.scene.sound.play('sfx_select');
      //this.setFrame(1);
      this.setTintFill(0xffffff);
      //this.setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000)
      //this.setTint(this.scene.tint);
      //this.set
      console.log(0xffffff)
  })
    this.Restart.on('pointerout',function(pointer){
      //this.setFrame(0);
      this.clearTint();
      console.log('pointer off')
  })

  this.Restart.on('pointerdown',function(pointer){
    //this.setFrame(0);
    //this.clearTint();
    this.scene.scene.start('playScene');
    console.log('pointer off')
    //this.scene.sound.play('sfx_select');
    })
        

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