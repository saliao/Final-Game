class play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.VEL = 50;
    }
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        //this.load.path = './assets/'
        this.load.image('man', "./assets/man.png")
        this.load.image('man2', "./assets/man2.png")
        this.load.image('man3', "./assets/man3.png")
        this.load.image('man4', "./assets/man4.png")
        //this.load.image('chicken',"./assets/chicken.png")
        this.load.image('tilesetImage','./assets/buildingtileset.png')
        this.load.image('buildingimage','./assets/building.png')
        //this.load.image('duck','./assets/duck.png')
        this.load.image('frame','./assets/framewindow.png')
        this.load.tilemapTiledJSON('tilemapJson', './assets/area01tmx.json')

    }
    create() {
        this.gameover = false
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
        this.selction_phase = true;
        this.start = false;
        this.timer = 0;
        const map = this.add.tilemap('tilemapJson')
        const tileset = map.addTilesetImage('buildingtileset', 'tilesetImage')

        //add layer
        const bgLayer = map.createLayer('Background', tileset, 0, 0).setDepth(0)

        //add player
        this.people = this.physics.add.group([
        //     {
        //     key: 'smoker',
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
        //     key: 'duck',
        //     setXY: {
        //         x:220,
        //         y:225
        //         //y:225

        //     }
        // },
        // {
        // key: 'chicken',
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

        bgLayer.setCollisionByProperty({collides: true});
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
        
    
        // this.input.on('pointerdown', function () {
        //     if(pointer.x == this.chicken.x && pointer.y == this.chicken.x){
        //     var cam = this.cameras.main;
        //     cam.startFollow(this.npc);
        //         cam.pan(this.npc.x, this.npc.y, 1, 'Power2');
        //         //cam.centerOn(this.npc.x, this.npc.y)
        //         //cam.zoomTo(4, 3000);
                
        //         cam.setZoom(2.5);
        //     }
    
        // }, this);
        //this.input.on('gameobjectdown',this.onObjectClicked);
        //this.chicken = new Person(this,220, 225, 'chicken');
        
       this.guy1= this.people.create(220, 120, 'man');
       this.guy2= this.people.create(220, 225, 'man2');
       
       this.guy3= this.people.create(220, 330, 'man3');
       this.guy4= this.people.create(220, 435, 'man4');
       this.pickedguy = this.guy4;
       //this.chicken.setDepth(-1);
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
        
        

    }
    // onObjectClicked() {
    //     var cam = this.cameras.main;
    //          cam.startFollow(this.npc);
    //     //         cam.pan(this.npc.x, this.npc.y, 1, 'Power2');
    //     //         //cam.centerOn(this.npc.x, this.npc.y)
    //     //         //cam.zoomTo(4, 3000);
                
    //              cam.setZoom(2.5);
    //     //     }

    // }
    random(object){
        //console.log('move time for: '+object);
            //console.log('you clicked ')
            let thing = Math.random();
            
            this.direction.x = Math.random() < 0.5 ? -1 : 1;
            
            if(thing < 0.5) {
                this.direction.x = 0;
            }
            this.direction.normalize()
            object.setVelocityX(this.VEL * this.direction.x)
            


    }
    update(time, delta) {
        if (this.gameover==true){
            this.scene.start("timeoverScene");

        }
        // if(this.selction_phase==true){
        //     this.time_left = 60000;
        // }
        if(this.selction_phase==false && this.time_left <=0){
            this.gameover = true;
        }
        if(this.selction_phase==false){
        this.time_left -= delta;
        this.scoreCenter.text = Math.round(this.time_left/1000);
        console.log(this.time_left/1000);
        }
        this.timer += delta;
        this.direction = new Phaser.Math.Vector2(0)


        if(this.cursors.left.isDown &&this.selction_phase==false){
            this.direction.x = -1
            this.people.flipX=true;
        } else if (this.cursors.right.isDown&&this.selction_phase==false) {
            this.direction.x = 1
            this.people.flipX=false;

        }
        //this.cursors.down.isDown
        //selecting character
        else if (Phaser.Input.Keyboard.JustDown(key1)&&this.selction_phase == true){
            this.pickedguy = this.guy1;
            this.sound.play('sfx_select');

        }
        else if (Phaser.Input.Keyboard.JustDown(key2)&&this.selction_phase == true){
            this.pickedguy = this.guy2;
            this.sound.play('sfx_select');

        }
        else if (Phaser.Input.Keyboard.JustDown(key3)&&this.selction_phase == true){
            this.pickedguy = this.guy3;
            this.sound.play('sfx_select');

        }
        else if (Phaser.Input.Keyboard.JustDown(key4)&&this.selction_phase == true){
            this.pickedguy = this.guy4;
            this.sound.play('sfx_select');

        }
        else if (Phaser.Input.Keyboard.JustDown(keyQ)){
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
        else if (this.cursors.up.isDown){
            //this.cameras.main.pan(420, 262.5, 1, 'Power2');
            
            //this.cameras.main.startFollow(pointer.x, pointer.y);
            //this.cameras.main.clearAlpha();
            //this.cameras.main.centerToSize;
            //this.cameras.main.setZoom(1);
            //this.cameras.main.centerOn(420, 262.5);

        }
        else if (Phaser.Input.Keyboard.JustDown(keyS) && this.selction_phase == true){
            this.selction_phase = false;
            this.Dialogue1.text = "Player 1: Press left or right arrow key to move charater"
            this.Dialogue2.text = "Player 2: Click on resident to observe, Press F to guess and Q to zoom out."
            this.sound.play('sfx_select');
        }
        this.direction.normalize()
        this.pickedguy.setVelocityX(this.VEL * this.direction.x);
        if (this.timer >= 1000 &&this.selction_phase==false) { //5000
            // console.log('move time');
            // //this.createDuck(450, 'Egg');
            // //this.bgm.rate += 0.01; 
            // let thing = Math.random();
            
            // this.direction.x = Math.random() < 0.5 ? -1 : 1;
             this.timer = 0;
             
             if(this.pickedguy.texture.key == 'man4'){
             this.random(this.guy1)
             this.random(this.guy2)
             this.random(this.guy3)
             }
            else if(this.pickedguy.texture.key == 'man'){
                this.random(this.guy4)
                this.random(this.guy2)
                this.random(this.guy3)
            }
            else if(this.pickedguy.texture.key == 'man2'){
                    
                    this.random(this.guy3)
                    this.random(this.guy4)
                    this.random(this.guy1)
                    
            }
            else if(this.pickedguy.texture.key == 'man3'){
                this.random(this.guy4)
                this.random(this.guy2)
                this.random(this.guy1)
            }
             //this.random(this.guy4)
            // if(thing < 0.5) {
            //     this.direction.x = 0;
            // }
            // this.direction.normalize()
            // this.people.setVelocityX(this.VEL * this.direction.x)
          }
        


        }
        

    }
