class ElevatorBlock extends BasicBlock{
    constructor(ctx, x, y, upLimit, downLimit){
        super(ctx)
        this.ctx = ctx

        this.width = 50
        this.height = 50

        this.upLimit = upLimit
        this.downLimit = downLimit
        
        this.pos = {x, y} 
        this.vel = {x: 0, y: 2} 
        this.direction = 'down'   
    }


    move(){
        //console.log(this.direction)
        if(this.pos.y >= this.downLimit && this.direction === 'down'){
            this.vel.y = -this.vel.y
            this.direction = 'up'
        }
        else if(this.pos.y <= this.upLimit && this.direction === 'up'){
            this.vel.y = -this.vel.y
            this.direction = 'down'
        }
        
        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}