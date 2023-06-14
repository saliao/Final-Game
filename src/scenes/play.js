class play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.VEL = 50;
    }
    preload() {
        this.load.spritesheet('resident1Walk', './assets/resident1anim.png',{frameWidth: 35, frameHeight: 70, startFrame: 0, endFrame: 8});
        this.load.spritesheet('resident1Idle', './assets/resident1-idlet.png',{frameWidth: 35, frameHeight: 70, startFrame: 0, endFrame: 3});
        this.load.spritesheet('resident2Walk', './assets/resident1anim2.png',{frameWidth: 35, frameHeight: 70, startFrame: 0, endFrame: 8});
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        //this.load.path = './assets/'
        this.load.image('man', "./assets/man.png")
        this.load.image('resident1', "./assets/resident1.png")
        this.load.image('resident2', "./assets/resident2.png")
        this.load.image('resident3', "./assets/resident3.png")
        this.load.image('resident4', "./assets/resident4.png")
        this.load.image('man2', "./assets/man2.png")
        this.load.image('man3', "./assets/man3.png")
        this.load.image('man4', "./assets/man4.png")
       
        this.load.image('rooms','./assets/roooms_back.png')
        this.load.image('tilesetImage','./assets/buildingtileset.png')
        this.load.image('sky','./assets/sky.png')
        this.load.image('buildingimage','./assets/building.png')
        
        this.load.image('frame','./assets/framewindow.png')
        this.load.tilemapTiledJSON('tilemapJson', './assets/area01tmx.json')

    }
    create() {
        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('resident1Walk', {      
                start: 0,
                end: 1,
                nextAnim: "resident1Walk",
                 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'walk2', 
            frames: this.anims.generateFrameNames('resident2Walk', {      
                start: 0,
                end: 1,
                nextAnim: "resident2Walk",
                 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'idle', 
            frames: this.anims.generateFrameNames('resident1Idle', {      
                start: 0,
                end: 1,
                nextAnim: "resident1Idle",
                 
            }), 
            frameRate: 10,
            //repeat: -1 
        });
        this.gameover = false

        //setting up an in game timer.  After 30 seconds game ends.
        this.time_left = 30000
        let timeConfig = {
            fontFamily: 'space mission',
            fontSize: '14px',
            backgroundColor: '#000',
                color: '#FFFFFF',
                align: 'center',
                padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
            }
        clickedtarget = "";
        //this.clickedsprite = '';
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.selction_phase = true;
        this.start = false;
        this.timer = 0;
        const map = this.add.tilemap('tilemapJson')
        const tileset = map.addTilesetImage('buildingtileset', 'tilesetImage')

        //add layer
        const bgLayer = map.createLayer('Background', tileset, 0, 0).setDepth(0)
        //add rooms
        this.Rooms = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'rooms').setOrigin(0)
        this.Rooms.setDepth(-100);
        //sky
        this.Sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky').setOrigin(0)
        this.Sky.setDepth(-110);
        //add NPCs
        this.people = this.physics.add.group([
        //     {
        //     key: 'man3',
        //     setXY: {
        //         x:220,
        //         y:119
        //         //y:225

        //     },
        //     setScale: {
        //         x:1,
        //         y:1
        //     }
        // },
        // {
        //     key: 'man2',
        //     setXY: {
        //         x:220,
        //         y:225
        //         //y:225

        //     }
        // },
        // {
        // key: 'man1',
        //     setXY: {
        //         x:220,
        //         y:225

        //     }
        // }

        ]);
        
        this.people.setDepth(-1)
        //this.npc = this.physics.add.sprite(220,225,'chicken',0);
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.npc.setInteractive();

        //Physics and collision
        bgLayer.setCollisionByProperty({collides: true});
        //Tilemap, just the building blocks layout.  Residents can collide with apartment blocks.
        this.physics.add.collider(this.people, bgLayer);
        this.building = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'buildingimage').setOrigin(0);
        this.building.setDepth(1);
        this.window = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'frame').setOrigin(0);
        this.window.setDepth(100);
        //camera controls
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(420, 262.5);
        this.cameras.main.resetFX();
        
        this.cameras.main.setBounds(0, 0, 840, 840);
        
    
       
        
       this.guy1= this.people.create(220, 120, 'resident1');
       this.guy2= this.people.create(220, 225, 'resident2');
       
       this.guy3= this.people.create(220, 330, 'resident3');
       this.guy4= this.people.create(220, 435, 'resident4');
       this.pickedguy = this.guy4;
       player1 = 'resident4'

       
       //this.chicken.setDepth(-1);
       //How player 2 can watch the residents.  The camera will zoom in on each item of people when they are clicked and main phaser camera will follow it.
        var cam = this.cameras.main;
        Phaser.Actions.Call(this.people.getChildren(), function(item){
            // make item interative
            item.setInteractive();

            item.on('pointerdown', function(pointer){
                console.log('you clicked ' + item.texture.key)
                clickedtarget = item.texture.key
                cam.startFollow(this);
    
                cam.setZoom(4);

            })

        }, this);
        this.scoreCenter = this.add.text(game.config.width-100, borderPadding-10, "" + this.time_left/1000, timeConfig);
        this.scoreCenter.setDepth(1000);

        
        this.Dialogue1 =this.add.text(game.config.width/2, borderPadding, 'Player 1: Press key 1, 2, 3, or 4 to choose character').setOrigin(0.5);
        this.Dialogue1.setDepth(1000)
        this.Dialogue1.color = '#000'

        this.Dialogue2 =this.add.text(game.config.width/2, game.config.height-10, 'Player 2: Press S to start').setOrigin(0.5);
        this.Dialogue2.setDepth(1000)
        this.Dialogue2.color = '#FFFFFF'
        this.iswalking = false;
        

    }
   //How NPCs or regular residents will move
  
    random(object){
        //console.log('move time for: '+object);
            //console.log('you clicked ')
            let thing = Math.random();
            
            this.direction.x = Math.random() < 0.5 ? -1 : 1;
                
            if (this.direction.x < 0) {
                //object.anims.play('walk',true);
                
                object.flipX=true;
                
            }
            else if (this.direction.x > 0) {
        
               // object.anims.play('walk',true);
                object.flipX=false;
                    
            }
            if(thing < 0.5) {
                this.direction.x = 0;


                object.flipX=false;
                //object.anims.play('idle');
            }
            this.direction.normalize()
            object.setVelocityX(this.VEL * this.direction.x)
            


    }
    npcwalk(){
        if (this.timer >= 1000 &&this.selction_phase==false) { //5000
            // console.log('move time');
            // //this.createDuck(450, 'Egg');
            // //this.bgm.rate += 0.01; 
            // let thing = Math.random();
            
            // this.direction.x = Math.random() < 0.5 ? -1 : 1;
             this.timer = 0;
             
             if(this.pickedguy.texture.key == 'resident4'&&this.selction_phase==false){
             this.random(this.guy1)
             this.random(this.guy2)
             this.random(this.guy3)
             }
            else if(this.pickedguy.texture.key == 'resident1'&&this.selction_phase==false){
                this.random(this.guy4)
                this.random(this.guy2)
                this.random(this.guy3)
            }
            else if(this.pickedguy.texture.key == 'resident2'&&this.selction_phase==false){
                    
                    this.random(this.guy3)
                    this.random(this.guy4)
                    this.random(this.guy1)
                    
            }
            else if(this.pickedguy.texture.key == 'resident3'&&this.selction_phase==false){
                this.random(this.guy4)
                this.random(this.guy2)
                this.random(this.guy1)
            }
            
          }
    }
    update(time, delta) {
        
        this.Sky.tilePositionX -= 0.1;
        if (this.gameover==true){
            this.scene.start("timeoverScene");

        }
        
        
        if(this.selction_phase==false && this.time_left <=0){
            this.gameover = true;
        }
        if(this.selction_phase==false){
        this.time_left -= delta;
        this.scoreCenter.text = Math.round(this.time_left/1000);
        //console.log(this.time_left/1000);
        }
        this.timer += delta;
        this.direction = new Phaser.Math.Vector2(0)

        
        if(this.cursors.left.isDown &&this.selction_phase==false){
            this.direction.x = -1
            //this.people.flipX=true;
             this.pickedguy.flipX=true;
             this.iswalking = true;
            
        } else if (this.cursors.right.isDown&&this.selction_phase==false) {
            this.direction.x = 1
            //this.people.flipX=false;
            //this.object
             this.pickedguy.flipX=false;
             
             this.iswalking = true;
            


        }
        
        
        //this.cursors.down.isDown
        //selecting character
        else if (Phaser.Input.Keyboard.JustDown(key1)){
            this.pickedguy = this.guy1;
            this.sound.play('sfx_select');
            player1 = "resident1"

        }
        else if (Phaser.Input.Keyboard.JustDown(key2)){
            this.pickedguy = this.guy2;
            this.sound.play('sfx_select');
            player1 = "resident2"

        }
        else if (Phaser.Input.Keyboard.JustDown(key3)){
            this.pickedguy = this.guy3;
            this.sound.play('sfx_select');
            player1 = "resident3"

        }
        else if (Phaser.Input.Keyboard.JustDown(key4)){
            this.pickedguy = this.guy4;
            this.sound.play('sfx_select');
            player1 = "resident4"

        }
        if (Phaser.Input.Keyboard.JustDown(keyQ)){
            //this.cameras.main.pan(420, 262.5, 1, 'Power2');
            
            this.cameras.main.stopFollow()
            //this.cameras.main.clearAlpha();
            //this.cameras.main.centerToSize;
            this.cameras.main.setZoom(1);
            this.cameras.main.centerOn(420, 262.5);
            clickedtarget = "";

        }
        else if (Phaser.Input.Keyboard.JustDown(keyF)&&this.selction_phase==false){
            //this.cameras.main.pan(420, 262.5, 1, 'Power2');
            
            console.log(clickedtarget);
            if (clickedtarget ==this.pickedguy.texture.key){
                this.sound.play('sfx_select');
                console.log("right person!");
                this.scene.start('p2wonScene');
            }
            else if(clickedtarget==''){

                console.log("no guess");
                

            }
            else {
                this.sound.play('sfx_select');
                this.scene.start('gameoverScene');
            }

        }
        
        else if (Phaser.Input.Keyboard.JustDown(keyS) && this.selction_phase == true){
            this.selction_phase = false;
            this.Dialogue1.text = "Player 1: Press left or right arrow key to move character"
            this.Dialogue2.text = "Player 2: Click on resident to observe, Press F to guess and Q to zoom out."
            this.sound.play('sfx_select');
        }
        this.direction.normalize()
        this.pickedguy.setVelocityX(this.VEL * this.direction.x);
        //this.pickedguy.anims.play("walk",true);
        this.npcwalk();
        //   if(this.iswalking == false){
        //   this.pickedguy.anims.play("idle");
        //   }
        if (this.iswalking == true) {
            //this.pickedguy.anims.play("walk2",true);
            this.iswalking == false;
           }
        else if(this.iswalking == false) {
            //this.pickedguy.anims.play("idle");
            //this.iswalking == false;
            
        }
        


        }
        

    }
