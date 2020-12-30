class BlockWithMotion extends BasicBlock{
    constructor(ctx, x, y, leftLimit, rightLimit, side){
        super()
        this.ctx = ctx

        this.width = 150
        this.height = 50


        this.leftLimit = leftLimit
        this.rightLimit = rightLimit
        
        this.pos = {x, y} 
        this.vel = {x: 1, y: 0} 
        this.direction = true   //true: right ----- false: left

        this.side = side

    }


    move(hero){

        if(this.pos.x >= this.rightLimit && this.direction){
            this.vel.x = -1
            this.direction = false
        }
        else if(this.pos.x <= this.leftLimit && !this.direction){
            this.vel.x = 1
            this.direction = true
        }
        
        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}