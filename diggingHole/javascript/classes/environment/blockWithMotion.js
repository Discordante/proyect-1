class BlockWithMotion extends BasicBlock{
    constructor(ctx, x, y, leftLimit, rightLimit){
        super(ctx)
        this.ctx = ctx

        this.width = 150
        this.height = 50

        this.leftLimit = leftLimit
        this.rightLimit = rightLimit
        
        this.pos = {x, y} 
        this.vel = {x: 1, y: 0} 
        this.direction = 'right'   
    }


    move(){
        if(this.pos.x >= this.rightLimit && this.direction === 'right'){
            this.vel.x = -1
            this.direction = 'left'
            
        }
        else if(this.pos.x <= this.leftLimit && this.direction === 'left'){
            this.vel.x = 1  
            this.direction = 'right'
        }
        
        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}