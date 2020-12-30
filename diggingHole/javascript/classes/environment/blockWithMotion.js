class BlockWithMotion extends BasicBlock{
    constructor(ctx, x, y, timer, side){
        super(ctx, x, y, side)
        this.ctx = ctx

        this.pos = {x, y} 
        this.vel = {x: 1, y: 0} 
        this.dir = true   //true: right ----- false: left

        this.timer = timer
        this.side = side
        this.intervalStatus = undefined
        this.timerCounter = 0
    }


    move(hero){
        this.intervalStatus = setInterval(() =>{

            if(this.dir){
                this.dir = false
                this.vel.x = -1
            }
            else{
                this.dir = true
                this.vel.x = 1
            }
        },this.timer)

        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        
        
    }
}