class Signals{
    constructor(ctx, x, y, type){
        this.ctx = ctx

        this.width = 60
        this.height = 60
        this.type = type

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity

        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        this.img = new Image()
        if(this.type === '4'){
            this.img.src = './././images/environment/Sign_04.png'
        }
        else if(this.type === '5') {
            this.img.src = './././images/environment/Sign_05.png'
        }
        
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }
    

    collisionBlocks(block){
        
        if (    //---collision down---
                this.pos.y <= block.pos.y + block.height && 
                this.pos.y >= block.pos.y && 
                this.pos.x + this.width >= block.pos.x && 
                this.pos.x <= block.pos.x + block.width &&
                this.pos.y + this.height > block.pos.y + block.height &&
                this.previousY > block.pos.y + block.height
                ) 
                {
                    //console.log('down')
                    this.pos.y = block.pos.y + block.height + 1
                    this.vel.y = 0   
                    this.vel.x = 0

            } 

            else if(//---collision up---
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y + this.height <= block.pos.y + block.height &&
                this.pos.x + this.width >= block.pos.x &&
                this.pos.x <= block.pos.x + block.width &&
                this.pos.y < block.pos.y && 
                this.previousY + this.height < block.pos.y 
                ) 

                {
                    //console.log('up')
                    
                    this.pos.y  = block.pos.y - this.height - 1
                    this.vel.y = 0
                    this.vel.x = 0

                    if(block instanceof BlockWithMotion){
                        this.vel.x = block.vel.x 
                    }

                    if(block instanceof ElevatorBlock){
                        this.pos.y  = block.pos.y - this.height - 5
                    }
                }

            else if( //---collision left---
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y <= block.pos.y + block.height &&
                this.pos.x + this.width >= block.pos.x &&
                this.pos.x < block.pos.x && 
                this.previousX +  this.width < block.pos.x)
        
                {
                    //console.log('left')
                    this.pos.x  = block.pos.x - this.width - 1
                }

            else if( // ---collision right---
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y <= block.pos.y + block.height &&
                this.pos.x <= block.pos.x + block.width &&
                this.pos.x + this.width > block.pos.x + block.width &&
                this.previousX > block.pos.x + block.width
                ) 

                {
                    //console.log('right')
                    this.pos.x  = block.pos.x + block.width + 1
                }
    }

    move(){
        //gravity
        this.vel.y += GRAVITY
        if(this.vel.y >= MAX_GRAVITY){
            this.vel.y = MAX_GRAVITY
        }
        
        //update position  
        this.previousX = this.pos.x
        this.previousY = this.pos.y
 

        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

    }
}