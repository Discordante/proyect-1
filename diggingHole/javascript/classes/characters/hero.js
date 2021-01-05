class Hero{
    constructor(ctx){
        this.ctx = ctx

        this.width = 40
        this.height = 60
        this.defaultHeight = 60
        

        this.blocked = false

        this.pos = {x: 100, y: 100} // position
        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.gravityStatus = true

        this.heightJump = {
            initial: this.pos.y,
            final: 0,
            aux: 0,
            heightCounter: true,
            distance: 0,
            damage: false
        }

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

            crouchStatus: false
        }

        //inventory
        this.inventory = {
            doorKey: false, 
            steelBoots: false
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

        /* //sprite
        this.sprite = new Image()
        this.sprite.src = './././images/sprites/hero/hero(5).png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 8
        this.sprite.verticalFrames = 3
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = 40
            this.sprite.frameHeight = 45
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        } */
    }

    isReady() {
        return this.sprite.isReady
    }

    draw(){
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    /* draw() {
      if (this.isReady()) {
        this.ctx.drawImage(
          this.sprite,
          this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
          this.sprite.verticalFrameIndex * this.sprite.frameHeight,
          this.sprite.frameWidth,
          this.sprite.frameHeight,
          this.pos.x,
          this.pos.y,
          this.width,
          this.height
        )
        this.sprite.drawCount++
        this.animate()
      }
    } */

   /*  animate() {
        if (this.movements.left) {
            this.animateLeft()
        }else if(this.movements.right) {
            this.animateRight()
        }
        else{
            this.animateStatic()
        }
    }

    animateStatic(){
        this.sprite.verticalFrameIndex = 2
        this.sprite.horizontalFrameIndex = 0
    }
    
    animateRight(){
        if(this.sprite.drawCount % 11 === 0){
            this.sprite.verticalFrameIndex = 0
            this.sprite.horizontalFrameIndex = 0
            if(this.sprite.horizontalFrameIndex === 8){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    }

    animateLeft(){
        if(this.sprite.drawCount % 11 === 0){
            this.sprite.verticalFrameIndex = 1
            this.sprite.horizontalFrameIndex = 0
            
            if(this.sprite.horizontalFrameIndex === 8){
                this.sprite.horizontalFrameIndex = 0
            }else{
                this.sprite.horizontalFrameIndex++
            }
        }
    } */

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

                    //height damage


                        if(this.heightJump.heightCounter){
                            this.heightJump.initial = this.pos.y
                            this.heightJump.heightCounter = false
                        } 
                        if(this.pos.y >= this.heightJump.initial && !this.heightJump.heightCounter){
                            this.heightJump.final = this.pos.y
                        }
                        if(this.pos.y < this.heightJump.initial && !this.heightJump.heightCounter){
                            this.heightJump.initial = this.pos.y
                        }
                        //console.log(`inicial: ${this.heightJump.initial}, final: ${this.heightJump.final}` )
                        if(this.heightJump.final > this.heightJump.initial){
                            this.heightJump.distance = this.heightJump.final - this.heightJump.initial
                            this.heightJump.heightCounter = true
                            this.heightJump.initial = undefined
                            this.heightJump.final = undefined
                        }
                        if(!this.heightJump.heightCounter){
                            this.heightJump.distance = 0
                            this.heightJump.damage = true
                        }
                        
                        
                   

                    if(!this.movements.left && !this.movements.right){
                        this.vel.x = 0
                    }

                    this.pos.y  = block.pos.y - this.height - 1
                    this.vel.y = 0

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

    move(){ 
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