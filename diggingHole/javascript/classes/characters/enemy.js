class Enemy {
    constructor(ctx, x, y, leftLimit, rightLimit){

        this.ctx = ctx

        this.width = 50
        this.height = 40

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity

        this.leftLimit = leftLimit
        this.rightLimit = rightLimit

        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.distance = undefined

        this.hp = BASIC_ENEMY_HP

        this.enemyStatus = false
        this.enemyPhase = 0
        this.enemyDirection = 'left'

        this.damage = BASIC_ENEMY_DAMAGE
        this.enemyDamage = true

        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        /* this.img = new Image()
        this.img.src = './././images/sprites/enemy/enemy-1.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }
        */
        this.enemyActive = true

        this.sounds = {
            active : new Audio('./././sound/snakehiss.mp3')
        } 
        this.sounds.active.volume = 0.3  
    }

    isReady(){
        return this.img.ready
    }

    /* draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    } */

    draw(){
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    
    activateEnemy(hero){
        this.distance = Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y))

        if(this.distance <= 300 && !this.enemyStatus){
            if(this.enemyActive){
                this.sounds.active.play()
                this.enemyActive = false
            }
            this.enemyStatus = true
            this.enemyPhase = 1
        }
    }

    activateEnemy(hero){
        this.distance = Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y))

        if(this.distance <= ACT_ENEMY_DISTANCE && !this.enemyStatus){
            if(this.enemyActive){
                this.sounds.active.play()
                this.enemyActive = false
            }
            setTimeout(() =>{
                this.enemyStatus = true
                this.enemyPhase = 1
            },1000)
        }
        if(this.distance <= ACT_ENEMY_DISTANCE && this.enemyStatus && hero.pos.x >= this.leftLimit && hero.pos.x <= this.rightLimit){
            this.enemyPhase = 1
        }
        if((this.distance >= ACT_ENEMY_DISTANCE && this.enemyStatus) || hero.pos.x >= this.rightLimit || hero.pos.x <= this.leftLimit || hero.movements.jump){
            this.enemyPhase = 2
        }

    }

    move(hero){

        if(!this.enemyStatus){
            if(this.enemyDirection === 'left'){
                this.vel.x = -ENEMY_VELOCITY.x + 2.5
                if(this.pos.x <= this.leftLimit){
                    this.enemyDirection = 'right'
                }
            }
            if(this.enemyDirection === 'right'){
                this.vel.x = ENEMY_VELOCITY.x -2.5
                if(this.pos.x>= this.rightLimit){
                    this.enemyDirection = 'left'
                }
            }
        } 

        else if(this.enemyStatus && this.enemyPhase === 1){
            if(hero.pos.x > this.pos.x + this.width + 1){ 
                this.vel.x = ENEMY_VELOCITY.x
            }
            else if(hero.pos.x + hero.width < this.pos.x - 1){
                this.vel.x = -ENEMY_VELOCITY.x
            }
        } 

        else if(this.enemyStatus && this.enemyPhase === 2){
            if(this.enemyDirection === 'left'){
                this.vel.x = -ENEMY_VELOCITY.x
                if(this.pos.x <= this.leftLimit){
                    this.enemyDirection = 'right'
                }
            }
            if(this.enemyDirection === 'right'){
                this.vel.x = ENEMY_VELOCITY.x
                if(this.pos.x>= this.rightLimit){
                    this.enemyDirection = 'left'
                }
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
                if(element instanceof Hero){
                    this.colisionStatus.left = true
                    element.pos.x = this.pos.x - element.width - 20   //enemy blocks you
                }
            }
        //RIGHT COLLISION
        else if( 
            element.pos.y + element.height >= this.pos.y &&
            element.pos.y <= this.pos.y + this.height &&
            element.pos.x <= this.pos.x + this.width &&
            element.pos.x + element.width > this.pos.x + this.width &&
            element.previousX >= this.pos.x + this.width)
            {
                if(element instanceof Hero){
                    this.colisionStatus.right = true
                    element.pos.x = this.pos.x + this.width + 20   //enemy blocks you
                }
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

                element.vel.y = -20

                if(element instanceof Hero){
                    this.colisionStatus.up = true
                    this.hp -= 50
                }
                
                //this.colisionStatus.up = true

                if(element instanceof Barrel){
                    this.hp -= 50
                    this.sounds.boxHit.play()
                }
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
                if(element instanceof Hero){
                    this.colisionStatus.down = true
                }
            }  
        else{
            this.colisionStatus.up = false
            this.colisionStatus.down = false
            this.colisionStatus.left = false
            this.colisionStatus.right = false
        } 

    }

    healthStatus(){
        if(this.hp <= 0){
            this.enemyStatus = false
            this.pos.x = undefined
        }
    }
}