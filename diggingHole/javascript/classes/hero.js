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

            jump: false,
            isJumping: false,
            jumpLimit: this.pos.y 
        }

        this.colisionStatus = false
    }

    draw(){
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    move(){
   
        //horizontal movement
        if (this.movements.right){
            this.vel.x = VELOCITY.x
        } 
        else if (this.movements.left) {
            this.vel.x = -VELOCITY.x
        } 
        else {
            this.vel.x = 0
        }


        //jump
        if(this.movements.jump && !this.movements.isJumping){
            this.movements.isJumping = true
            this.vel.y = -15
        }
        
        if(this.vel.y >= 15){
            this.movements.isJumping = false
        }

        //position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

        //gravity
        this.vel.y += GRAVITY.y
        if(this.vel.y >= MAX_GRAVITY){
            this.vel.y = MAX_GRAVITY
        }

            


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
        if(this.pos.y < block.pos.y + block.height && this.pos.y + this.height > block.pos.y && this.pos.x < block.pos.x + block.width && this.pos.x + this.width > block.pos.x && !this.colisionStatus){
            console.log('colision')
            this.vel.y = 0
            this.colisionStatus = true
        }

        else if(this.colisionStatus) {  
            this.colisionStatus = false
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

            default:
                break;
          }

    }
}