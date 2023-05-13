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
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        
    }
    
    
    create() {
        this.JUMP_VELOCITY = -500; //-700
        this.MAX_JUMPS = 3; //2
        this.SCROLL_SPEED = 4; //4
        
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'mountains').setOrigin(0);
        this.farmground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'farmground').setOrigin(0);
        // print Scene name
        this.add.text(game.config.width/2, 30, 'Scene 5: Endless Strollin\'', { font: '14px Futura', fill: '#00AA11' }).setOrigin(0.5);

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'ground').setOrigin(0).setScale(1.2);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'groundtile').setOrigin(0).setScale(1.2);
        this.chicken = this.physics.add.sprite(120, game.config.height/2-tileSize, 'Chicken').setScale(1.2);

        // add physics collider
        this.physics.add.collider(this.chicken, this.ground);

        cursors = this.input.keyboard.createCursorKeys();
    }   
    update() {
        this.talltrees.tilePositionX += this.SCROLL_SPEED-3;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        this.farmground.tilePositionX += this.SCROLL_SPEED-2;

        this.chicken.isGrounded = this.chicken.body.touching.down;
	    // if so, we have jumps to spare
	    if(this.chicken.isGrounded) {
            //this.alien.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    } else {
	    	//this.chicken.anims.play('jump');
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