class Runner extends Phaser.Scene {
    constructor() {
        super("runnerScene");
    }
    preload() {
          
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image("platform", "./assets/platform.png");
        this.load.image("ground", "./assets/grassblock.png");
        this.load.image("groundtile", "./assets/groundtile.png");
        this.load.image("Chicken", "./assets/Chicken.png");
        this.load.image("mountains", "./assets/Mountains.png");
        this.load.image("farmground", "./assets/farmground.png");
        this.load.image("farmground2", "./assets/farmground2.png");
        this.load.image("Egg", "./assets/Egg.png");
        this.load.image('crow', './assets/crow.png');
        this.load.image('Duck', './assets/duck.png');
        this.load.spritesheet('Crowanim', './assets/crowflyanim.png',{frameWidth: 50, frameHeight: 25, startFrame: 0, endFrame: 3});
        this.load.spritesheet('ChickenWalk', './assets/Chickenwalkanimt.png',{frameWidth: 35, frameHeight: 40, startFrame: 0, endFrame: 3});
        this.load.spritesheet('ChickenJump', './assets/Chickenjumpanim.png',{frameWidth: 35, frameHeight: 40, startFrame: 0, endFrame: 2});
        this.load.spritesheet('DuckRun', './assets/duckrunanim.png',{frameWidth: 35, frameHeight: 40, startFrame: 0, endFrame: 3});
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        
    }
    
    
    create() {
        this.bgm = this.sound.add('beats', { 
            mute: false,
            volume: 0.4,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.timer = 0;
        this.secondtimer = 0;
        this.thirdtimer = 0;
        this.timer4 = 0;
        score = 0;
        this.eggs = 5;
        this.gameOver = false;
        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('ChickenWalk', {      
                start: 0,
                end: 3,
                nextAnim: "ChickenWalk",
                 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'jump', 
            frames: this.anims.generateFrameNames('ChickenJump', {      
                start: 0,
                end: 2,
                nextAnim: "ChickenJump",
                 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'crowfly', 
            frames: this.anims.generateFrameNames('Crowanim', {      
                start: 0,
                end: 3,
                nextAnim: "Crowanim",
                 
            }), 
            frameRate: 10,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'duckRun', 
            frames: this.anims.generateFrameNames('DuckRun', {      
                start: 0,
                end: 3,
                nextAnim: "DuckRun",
                 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.JUMP_VELOCITY = -500; //-700
        this.MAX_JUMPS = 3; //2
        this.SCROLL_SPEED = 4; //4
        
        //this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0);
        //this.farmground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'farmground').setOrigin(0);
        this.farmground2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'farmground2').setOrigin(0);
        // print Scene name
        this.scoreField = this.add.text(game.config.width/2, 30, 'Score: ' + score, { font: '24px Fantasy', fill: '#000' }).setOrigin(0.5);
        this.scoreField2 = this.add.text(game.config.width/2, 60, 'Eggs: ' + this.eggs, { font: '24px Fantasy', fill: '#FFFF' }).setOrigin(0.5);
        // make ground tiles group
        this.ground = this.add.group();
        //this.duckGroup = this.physics.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setOrigin(0).setScale(1.2);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundtile').setOrigin(0).setScale(1.2);
        this.chicken = this.physics.add.sprite(120, game.config.height/2-tileSize, 'Chicken');//.setScale(1.2);
        this.duckGroup = this.physics.add.group();
        this.projectileGroup = this.physics.add.group();
        this.wolfGroup = this.physics.add.group();
        this.falconGroup = this.physics.add.group();
        this.chicken.setGravityY(1500);
        
        //this.physics.add.sprite(800, game.config.height/2-tileSize, 'Chicken').setScale(1.2);

        // add physics collider
        this.physics.add.collider(this.chicken, this.ground);
        this.physics.add.collider(this.duckGroup, this.ground);
        this.physics.add.collider(this.wolfGroup, this.ground);
        
        // this.physics.add.collider(this.duckGroup, this.ground, (singleDuck) => {
        //     singleDuck.setVelocityX(-200);
        // });

        //this.physics.add.collider(this.chicken,this.duck,);
        //for the ducks
        this.physics.add.overlap(this.chicken, this.duckGroup, (chicken, singleDuck) => {
            singleDuck.destroy();
            console.log('touched an egg');
            this.eggs += 1;
          });
        this.physics.add.overlap(this.chicken, this.wolfGroup, (chicken, singleWolf) => {
            singleWolf.destroy();
            console.log('wolf hit the chicken!');
            this.sound.play('bawk');
            this.bgm.stop();
            this.scene.start("gameoverScene");
          });
        this.physics.add.overlap(this.projectileGroup, this.wolfGroup, (singleProjectile, singleWolf) => {
            console.log('egg hit wolf');
            this.sound.play('quack');
            singleWolf.destroy();
            
            singleProjectile.destroy();
            score += 100;
            
            
          });
        this.physics.add.overlap(this.chicken, this.falconGroup, (chicken, singleFalcon) => {
            singleFalcon.destroy();
            console.log('falcon hit the chicken!');
            this.sound.play('bawk');
            this.bgm.stop();
            this.scene.start("gameoverScene");
          });
        this.physics.add.overlap(this.projectileGroup, this.falconGroup, (singleProjectile, singleFalcon) => {
            console.log('egg hit falcon');
            this.sound.play('caw');
            singleFalcon.destroy();
            singleProjectile.destroy();
            score += 200;
            
            
          });

        //this.duck.setVelocityX(-this.MAX_VELOCITY);
        //this.duck.setFlip(true, false);
        cursors = this.input.keyboard.createCursorKeys();
    }   
    shooteggs(texture) {
        const missile = this.projectileGroup.create(this.chicken.x, this.chicken.y, 'Egg');
        //missile.x = this.chiken + 20;
        this.eggs -= 1;
        missile.setScale(1);
        //missile.setDepth(6);
        //missile.setGravityY(10);
        missile.body.velocity.x = 500;

    }
    createDuck(height, texture) {
        const missile = this.duckGroup.create(game.config.width+35, height, 'Egg');
        missile.body.velocity.x = this.SCROLL_SPEED*-69.9;//this.JUMP_VELOCITY;
        missile.setGravityY(2600);
        //missile.setScale(0.1);
        //missile.setDepth(6);
        //missile.setSize(missile.width, missile.height - 300);
        //missile.setOffset(0, 150);
      }
    createWolf(height, texture) {
        const missile = this.wolfGroup.create(game.config.width+35, height, 'Duck');
        missile.body.velocity.x = this.SCROLL_SPEED*-69.9- Phaser.Math.Between(150, 350);
        missile.setGravityY(2600);
        missile.body.setSize(35,35);
        missile.play('duckRun',true);
        //missile.setScale(0.1);
        //missile.setDepth(6);
        //missile.setSize(missile.width, missile.height - 300);
        //missile.setOffset(0, 150);
      }
    createFalcon(height, texture) {
        
        const missile = this.falconGroup.create(game.config.width+35, Phaser.Math.Between(150, 350), texture);
        missile.body.velocity.x = this.SCROLL_SPEED*-69.9- Phaser.Math.Between(150, 350);
        missile.play('crowfly',true);
        missile.body.setSize(50,20);
        //missile.setGravityY(2600);
        //missile.setScale(0.1);
        //missile.setDepth(6);
        //missile.setSize(missile.width, missile.height - 300);
        //missile.setOffset(0, 150);
      }
    update(time, delta) {
        if (score > highscore){
            highscore = score;
        }
        this.timer += delta;
        this.timer4 += delta;
        this.secondtimer += delta;
        this.thirdtimer += delta;
        if (this.timer >= 5000) { //5000
          console.log('Egg time');
          this.createDuck(450, 'Egg');
          this.bgm.rate += 0.01;   
          this.timer = 0;
        }

        
        if (this.secondtimer >= 3000) { //5000
            console.log('Wolf time');
            this.createWolf(450, 'Chicken');
            
            this.secondtimer = 0;
        }
        if (this.thirdtimer >= 4000) { //5000
            console.log('Falcon time');
            this.createFalcon(50, 'Crow');
            this.createFalcon(50, 'Crow');
            
            
            this.thirdtimer = 0;
        }

        if (this.timer4 >= 1000) {
            console.log('Random time');
            let num = Phaser.Math.Between(0, 1);
            if (num == 0){
                this.createWolf(450, 'Chicken');
            }
            if (num == 1){
                this.createFalcon(450, 'Chicken');
            }
            this.SCROLL_SPEED += 0.1;
            this.timer4 = 0;
        }


        score += 0.10 +(this.SCROLL_SPEED)/50;//0.10
        this.scoreField.text = 'Score: ' + Math.round(score);
        this.scoreField2.text = 'Eggs: ' + this.eggs;
        //this.SCROLL_SPEED += 0.001;
        this.talltrees.tilePositionX += this.SCROLL_SPEED*0.1;
        this.farmground2.tilePositionX += this.SCROLL_SPEED*0.5;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        //this.farmground.tilePositionX += this.SCROLL_SPEED*0.5;
        
        this.chicken.isGrounded = this.chicken.body.touching.down;
        //this.duck.x -= this.SCROLL_SPEED*2;
	    // if so, we have jumps to spare
	    if(this.chicken.isGrounded) {
            this.chicken.anims.play('walk',true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.chicken.anims.play('jump',true);
	    }
        if(Phaser.Input.Keyboard.JustDown(keyF) && this.eggs > 0) { //150
	        console.log("fire");
            this.shooteggs('Egg');
            this.sound.play('bawk');

	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 100)) { //150
	        this.chicken.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
            this.sound.play('flap');
            
            console.log("fire");
	        //this.upKey.tint = 0xFACADE;
	    } else {
	    	//this.upKey.tint = 0xFFFFFF;
	    }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
            
	    	this.jumps--;
	    	this.jumping = false;
	    }
    }

}