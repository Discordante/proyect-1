class Hero{
    constructor(ctx){
        this.ctx = ctx

        this.width = 40
        this.defaultHeight = 60
        this.height = 60

        this.health = 100

        this.blocked = false

        this.pos = {x: 100, y: 200} // position
        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.gravityStatus = true

        this.movements = {
            up: false,
            down: false,
            right: false,
            left: false,
            run: false,
            jump: false,
            crouch: false,

            jumpStatus: false,
            jumpLimit: -30,
            jumpTimer: 0,
            jumpTimerFunction: undefined,

            crouchStatus: false,

            motionBlockCollision: false,
            motionBlockDirection: 'left'
        }

        //inventory
        this.inventory = {
            doorKey: true, //change later
            steelBoots: true
        }

        //collisions
        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        //sounds
        this.sounds = {
            jump: new Audio('./././sound/jump-sound.mp3')
        } 
        this.sounds.jump.volume = 0.3

    }

    isReady() {
        return this.sprite.isReady
    }

    draw(){
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
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
                        
                    if(block instanceof BlockWithMotion){
                        this.movements.motionBlockCollision = true
                        this.pos.x
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
            else{
                this.movements.motionBlockCollision = false
            }
    }

    move(element){
        this.previousX = this.pos.x
        this.previousY = this.pos.y
        
        if (this.movements.right){
            if(!this.movements.crouch){
                this.movements.run ?  this.vel.x = VELOCITY.x + 3 : this.movements.crouchStatus? this.vel.x = VELOCITY.x -2.99 : this.vel.x = VELOCITY.x;
            }
            else if(!this.movements.run){
                this.movements.crouch ?  this.vel.x = VELOCITY.x - 2.99 : this.vel.x = VELOCITY.x
            }
        } 
        else if (this.movements.left) {
            if(!this.movements.crouch){
                this.movements.run ?  this.vel.x = -VELOCITY.x - 3 : this.movements.crouchStatus? this.vel.x = -VELOCITY.x +2.99 : this.vel.x = -VELOCITY.x
            }
            else if(!this.movements.run){
                this.movements.crouch ?  this.vel.x = -VELOCITY.x + 2.99 : this.vel.x = -VELOCITY.x
            }
            
        } 
        
        else if(this.movements.motionBlockDirection === 'right' && this.movements.motionBlockCollision){
            this.vel.x = 1
        }
        else if(this.movements.motionBlockDirection === 'left' && this.movements.motionBlockCollision){
            this.vel.x = -1
        }
        else {  
            this.vel.x = 0
        }
        
        console.log(this.movements.motionBlockDirection)

        //crouch movement
        if (this.movements.crouch && !this.movements.crouchStatus){ 
            this.height = 20
            this.movements.crouchStatus = true
        } 

        if(!this.movements.crouch && this.movements.crouchStatus){
            this.pos.y -= 50
            this.height = this.defaultHeight
            this.movements.crouchStatus = false
        } 


        //gravity
        if(this.gravityStatus){
            this.vel.y += GRAVITY
            if(this.vel.y >= MAX_GRAVITY){
                this.vel.y = MAX_GRAVITY
            }
        }
        
        
        //jump
        if(this.movements.jump && !this.movements.jumpStatus && !this.movements.isDown && !this.colisionStatus.left && !this.colisionStatus.right){
            this.movements.jumpStatus = true
            this.vel.y = this.movements.jumpLimit
            this.sounds.jump.play()

            this.movements.jumpTimerFunction = setInterval(() => {
                this.movements.jumpTimer++
            }, 10)
        }

        else if(!this.movements.jump && this.movements.jumpStatus && this.movements.jumpTimer >= 35){
            this.movements.jumpStatus = false
            this.movements.jumpTimer = 0
            clearInterval(this.movements.jumpTimerFunction)
        }

        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        
     /*    //limits
        if(this.pos.x >= this.ctx.canvas.width - this.width){
            this.pos.x = this.ctx.canvas.width - this.width
        } 
        if(this.pos.x <= 0){   
            this.pos.x = 0
        }

        if(this.pos.y <= 0){   
            this.pos.y = 0
        } */

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
            case KEY_CROUCH:
                this.movements.crouch = status
                break;

            default:
                break;
          }
    }

} 