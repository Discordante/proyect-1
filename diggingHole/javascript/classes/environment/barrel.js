class Barrel{
    constructor(ctx, x, y, type){
        this.ctx = ctx

        this.width = 45
        this.height = 50
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
        if(this.type === 'barrel'){
            this.img.src = './././images/environment/Wooden_Barrel.png'
        }
        else {
            this.img.src = './././images/environment/Wooden_Box.png'
        }
        
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        this.sounds = {
            scrap: new Audio('./././sound/scrapping.mp3')
        } 
        //this.sounds.scrap.volume = 0.1 

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
                    this.vel.x = 0
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
                    this.vel.x = 0
                }
    }

    collision(element){
        //LEFT COLLISION
        if( element.pos.y + element.height >= this.pos.y &&
            element.pos.y <= this.pos.y + this.height &&
            element.pos.x + element.width >= this.pos.x &&
            element.pos.x < this.pos.x && 
            element.previousX +  element.width <= this.pos.x)
            {
                this.colisionStatus.left = true
                this.pos.x = element.pos.x + element.width + 1 //you push enemy
            }
        //RIGHT COLLISION
        else if( 
            element.pos.y + element.height >= this.pos.y &&
            element.pos.y <= this.pos.y + this.height &&
            element.pos.x <= this.pos.x + this.width &&
            element.pos.x + element.width > this.pos.x + this.width &&
            element.previousX >= this.pos.x + this.width)
            {
                this.colisionStatus.right = true
                this.pos.x = element.pos.x - this.width - 1 //you push enemy
            }
        //TOP COLLISION
        else if( 
            element.pos.y + element.height >= this.pos.y &&
            element.pos.y + element.height <= this.pos.y + this.height &&
            element.pos.x + element.width >= this.pos.x &&
            element.pos.x <= this.pos.x + this.width &&
            element.pos.y < this.pos.y && 
            element.previousY + element.height < this.pos.y) 
            {
                this.colisionStatus.up = true
            
                element.pos.y = this.pos.y - this.height -20
            }
         //BOTTOM COLLISION
        else if(
            element.pos.y <= this.pos.y + this.height && 
            element.pos.y >= this.pos.y && 
            element.pos.x + element.width >= this.pos.x && 
            element.pos.x <= this.pos.x + this.width &&
            element.pos.y + element.height > this.pos.y + this.height &&
            element.previousY > this.pos.y + this.height)
            {
                this.colisionStatus.down = true
            }  
        else{
            this.colisionStatus.up = false
            this.colisionStatus.down = false
            this.colisionStatus.left = false
            this.colisionStatus.right = false
            } 
    }

    move(){
        //gravity
        this.vel.y += GRAVITY
        if(this.vel.y >= MAX_GRAVITY){
            this.vel.y = MAX_GRAVITY
        }
        

        if(this.previousX != this.pos.x){
            this.sounds.scrap.play()
        }
        else{
            this.sounds.scrap.pause()
        }

        //update position  
        this.previousX = this.pos.x
        this.previousY = this.pos.y
 

        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}