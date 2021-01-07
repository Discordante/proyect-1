class ElevatorBlock extends BasicBlock{
    constructor(ctx, x, y, width, upLimit, downLimit, speed){
        super(ctx)
        this.ctx = ctx

        this.width = width
        this.height = 50

        this.upLimit = upLimit
        this.downLimit = downLimit
        
        this.pos = {x, y} 
        this.vel = {x: 0, y: speed} 
        this.direction = 'down'   
        if(this.width === 150){
            this.img.src = '././images/environment/floor/Ground_x3.png'
        }
        else if(this.width === 100){
            this.img.src = '././images/environment/floor/Ground_x2.png'
        }
        else{
            this.img.src = '././images/environment/floor/Ground_x1.png'
        }
        
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