class BasicEnemy{
    constructor(ctx, x, y){
        this.ctx = ctx

        this.width = 70
        this.height = 100

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.hp = BASIC_ENEMY_HP

        this.enemyStatus = false

        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        /* this.sounds = {
            jump: new Audio('./././sound/jump.mp3')
          } 
          this.sounds.jump.volume = 0.1 */

    }

    isReady(){
        return this.img.ready
    }

    draw(){
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    
    activateEnemy(hero){
        //console.log(Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y))) 
        if(Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y)) < 300){
            this.enemyStatus = true
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

    move(hero){
        if(this.enemyStatus){
            
            if(hero.pos.x > this.pos.x + this.width){
                this.vel.x = ENEMY_VELOCITY.x
            }
            else if(hero.pos.x + hero.width < this.pos.x){
                this.vel.x = -ENEMY_VELOCITY.x
            }
        }
        
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