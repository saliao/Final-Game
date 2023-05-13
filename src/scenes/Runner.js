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
        this.load.spritesheet('ChickenWalk', './assets/Chickenwalkanimt.png',{frameWidth: 35, frameHeight: 40, startFrame: 0, endFrame: 3});
        this.load.spritesheet('ChickenJump', './assets/Chickenjumpanim.png',{frameWidth: 35, frameHeight: 40, startFrame: 0, endFrame: 2});
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        
    }
    
    
    create() {
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
        this.JUMP_VELOCITY = -500; //-700
        this.MAX_JUMPS = 3; //2
        this.SCROLL_SPEED = 2; //4
        
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0);
        this.farmground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'farmground').setOrigin(0);
        // print Scene name
        this.scoreField = this.add.text(game.config.width/2, 30, 'Distance: ' + score + ' feet', { font: '24px Fantasy', fill: '#000' }).setOrigin(0.5);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setOrigin(0).setScale(1.2);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundtile').setOrigin(0).setScale(1.2);
        this.chicken = this.physics.add.sprite(120, game.config.height/2-tileSize, 'Chicken');//.setScale(1.2);
        this.duck = this.physics.add.sprite(800, game.config.height/2-tileSize, 'Chicken').setScale(1.2);

        // add physics collider
        this.physics.add.collider(this.chicken, this.ground);
        this.physics.add.collider(this.duck, this.ground);
        this.physics.add.collider(this.chicken,this.duck,);
        //this.duck.setVelocityX(-this.MAX_VELOCITY);
        this.duck.setFlip(true, false);
        cursors = this.input.keyboard.createCursorKeys();
    }   
    update() {
        score += 0.10;//+(this.SCROLL_SPEED)/50;//0.10
        this.scoreField.text = 'Distance: ' + Math.round(score) + ' m';
        //this.SCROLL_SPEED += 0.001;
        this.talltrees.tilePositionX += this.SCROLL_SPEED*0.1;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        this.farmground.tilePositionX += this.SCROLL_SPEED*0.5;
        
        this.chicken.isGrounded = this.chicken.body.touching.down;
        this.duck.x -= 4;
	    // if so, we have jumps to spare
	    if(this.chicken.isGrounded) {
            this.chicken.anims.play('walk',true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	this.chicken.anims.play('jump',true);
	    }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
	    if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 100)) { //150
	        this.chicken.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
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