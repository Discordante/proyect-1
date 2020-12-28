class GeneralClass{
    constructor(ctx, x, y){
        this.ctx = ctx

        this.width = 30
        this.height = 30

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.gravityStatus = true

    }

    isReady(){
        return this.img.ready
    }

    draw(){
        
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    
    collision(element){
        if (this.pos.x < element.pos.x + element.width &&
            this.pos.x  + this.width > element.pos.x &&
            this.pos.y  < element.pos.y + element.height &&
            this.pos.y  + this.height > element.pos.y) {

            return true
         }
        return false
    }

    move(){

        /* //gravity
        if(this.gravityStatus){
            this.vel.y += GRAVITY
            if(this.vel.y >= MAX_GRAVITY){
                this.vel.y = MAX_GRAVITY
            }
        } */

        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

    }
}