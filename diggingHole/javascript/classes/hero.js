class Hero{
    constructor(ctx){
        this.ctx = ctx

        this.width = 40
        this.height = 60

        this.pos = {x: this.ctx.canvas.width / 2, y: 0} // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.movements = {
            up: false,
            down: false,
            right: false,
            left: false,
            run: false,

            jump: false,
            isJumping: false,
            isDown: false,
            jumpLimit: -30,
        }

        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }

    draw(){
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    move(){
        //horizontal movement
        if (this.movements.right){
            if(!this.movements.down){
                this.movements.run ?  this.vel.x = VELOCITY.x + 3 : this.movements.isDown? this.vel.x = VELOCITY.x -2.99 : this.vel.x = VELOCITY.x
            }
            else if(!this.movements.run){
                this.movements.down ?  this.vel.x = VELOCITY.x - 2.99 : this.vel.x = VELOCITY.x
            }
        } 
        else if (this.movements.left) {
            if(!this.movements.down){
                this.movements.run ?  this.vel.x = -VELOCITY.x - 3 : this.movements.isDown? this.vel.x = -VELOCITY.x +2.99 : this.vel.x = -VELOCITY.x
            }
            else if(!this.movements.run){
                this.movements.down ?  this.vel.x = -VELOCITY.x + 2.99 : this.vel.x = -VELOCITY.x
            }
            
        } 
        else {
            this.vel.x = 0

        }
        //bend movement
        if (this.movements.down){ 
            this.height = 30
            this.movements.isDown = true
        } 

        if(!this.movements.down && this.movements.isDown && !this.colisionStatus.down){
            this.pos.y -= 50
            this.height = 60
            this.movements.isDown = false
        } 

        //gravity
        this.vel.y += GRAVITY
        if(this.vel.y >= MAX_GRAVITY){
            this.vel.y = MAX_GRAVITY
        }

        //jump
        if(this.movements.jump && !this.movements.isJumping && !this.movements.isDown){
            this.movements.isJumping = true
            this.vel.y = this.movements.jumpLimit
        }
        
        else if(!this.movements.jump && this.vel.y >= MAX_GRAVITY || this.colisionStatus.left || this.colisionStatus.right || this.colisionStatus.up || (this.colisionStatus.down && !this.movements.isDown)){
            this.movements.isJumping = false
        }


        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

        
        //limits
        if(this.pos.x >= this.ctx.canvas.width - this.width){
            this.pos.x = this.ctx.canvas.width - this.width
        } 
        if(this.pos.x <= 0){   
            this.pos.x = 0
        }
        if(this.pos.y >= this.ctx.canvas.height - this.height){
            this.pos.y = this.ctx.canvas.height - this.height
        } 
        if(this.pos.y <= 0){   
            this.pos.y = 0
        }

    }

    collision(block){
      
        if (
                this.pos.y <= block.pos.y + block.height && 
                this.pos.y >= block.pos.y && 
                this.pos.x + this.width >= block.pos.x && 
                this.pos.x <= block.pos.x + block.width 
                ){
                    this.pos.y = block.pos.y + block.height 
                    this.vel.y = 0   
                    this.vel.x = 0
                    this.colisionStatus.down = true
            } else if( 
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y + this.height <= block.pos.y + block.height &&
                this.pos.x + this.width >= block.pos.x && 
                this.pos.x <= block.pos.x + block.width 
                ){
                    this.pos.y  = block.pos.y - this.height 
                    this.vel.y = 0
                    this.vel.x = 0
                    this.colisionStatus.up = true
                }
             else if( 
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y <= block.pos.y + block.height &&
                this.pos.x + this.width >= block.pos.x && 
                this.pos.x <= block.pos.x 
                ){
                    this.pos.x  = block.pos.x - this.width - 1
                    this.vel.x = 0
                    this.vel.y = 0
                    this.colisionStatus.left = true
                }
            else if( 
                this.pos.y + this.height >= block.pos.y &&
                this.pos.y <= block.pos.y + block.height &&
                this.pos.x + this.width >= block.pos.x && 
                this.pos.x <= block.pos.x + block.width 
                ){
                    this.pos.x  = block.pos.x + block.width + 1
                    this.vel.x = 0
                    this.vel.y = 0
                    this.colisionStatus.right = true
                } 
            else{
                this.colisionStatus.up = false
                this.colisionStatus.down = false
                this.colisionStatus.left = false
                this.colisionStatus.right = false
            }
    }
     
    onKeyEvent(event){  
        const status = event.type === 'keydown' 

        switch (event.code) {
            case KEY_UP:
                this.movements.up = status
                break;
            case KEY_DOWN:
                this.movements.down = status
                break;
            case KEY_RIGHT:
                this.movements.right = status
                break;
            case KEY_LEFT:
                this.movements.left = status
                break;
            case KEY_JUMP:
                this.movements.jump = status
                break;
            case KEY_RUN:
                this.movements.run = status
                break;

            default:
                break;
          }

    }
}