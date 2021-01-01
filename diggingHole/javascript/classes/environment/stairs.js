class Stairs extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 50
        this.width = 50

        this.stairStatus = false
        
        this.img = new Image()
        this.img.src = './././images/environment/Ladder.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        /* this.sounds = {
            closedDoor: new Audio('././sound/close_door_1.mp3'),
            openDoor: new Audio('././sound/open_creaky_door.mp3')
        }  */

    }
    
    
    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        this.stairStatus = super.collision(element)
        if(this.stairStatus && !element.movements.up){
            element.vel.y = 0 
            element.vel.x = 0

        }
        if(this.stairStatus && element.movements.up){
            element.vel.y = -GRAVITY-2
            element.vel.x = 0

        }
    }
}