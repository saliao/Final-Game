//Creating Person class
class Person extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); 
        //scene.physics.add.existing(this);
        this.timer = 0;
        scene.people.create(x, y, texture);
        this.setDepth(-1);
        //this.points = pointValue;
        //this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update(time, delta) {
        this.timer += delta;
        this.direction = new Phaser.Math.Vector2(0);
        if (this.timer >= 1000) { //5000
            console.log('move time');
            //this.createDuck(450, 'Egg');
            //this.bgm.rate += 0.01; 
            let thing = Math.random();
            
            this.direction.x = Math.random() < 0.5 ? -1 : 1;
            this.timer = 0;
            if(thing < 0.5) {
                this.direction.x = 0;
            }
            this.direction.normalize()
            this.setVelocityX(50 * this.direction.x)
          }

        // this.x -= this.moveSpeed;

        // if(this.x <= 0 - this.width) {
        //     this.reset();
        // }
    }
    reset() {
        //this.x = game.config.width;
    }
}