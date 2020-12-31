class BasicEnemy{
    constructor(ctx, x, y){
        this.ctx = ctx

        this.width = 100
        this.height = 130

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        this.previousX = this.pos.x
        this.previousY = this.pos.y

        this.distance = undefined

        this.hp = BASIC_ENEMY_HP

        this.enemyLaugh = true
        this.enemyStatus = false
        this.enemyPhase = 0
        this.enemyDirection = 'left'

        this.damage = ENEMY_DAMAGE
        this.enemyDamageUp = true

        this.colisionStatus = {
            up: false,
            down: false,
            right: false,
            left: false
        }

        this.img = new Image()
        this.img.src = './././images/sprites/enemy/enemy-1.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        this.deathSound = true
        this.sounds = {
            laugh: new Audio('./././sound/Evil-Laugh-2.mp3'),
            boxHit: new Audio('./././sound/box-hit.mp3'),
            damage: new Audio('./././sound/damage-sound.mp3'),
            death : new Audio('./././sound/Monster-Growl.mp3')
        } 
        this.sounds.laugh.volume = 0.3 

    }

    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }
    
    activateEnemy(hero){
        this.distance = Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y))

        if(this.distance <= 500 && !this.enemyStatus){
            if(this.enemyLaugh){
                this.sounds.laugh.play()
                this.enemyLaugh = false
            }
            setTimeout(() =>{
                this.enemyStatus = true
                this.enemyPhase = 1
            },6000)
        }
        else if(this.distance <= ACT_ENEMY_DISTANCE && this.enemyStatus){
            this.enemyPhase = 1
        }
        else if(this.distance >= ACT_ENEMY_DISTANCE && this.enemyStatus){
            this.enemyPhase = 2
        }
    }

    move(hero){
        if(this.enemyStatus && this.enemyPhase === 1){
            if(hero.pos.x > this.pos.x + this.width + 2){
                this.vel.x = ENEMY_VELOCITY.x
            }
            else if(hero.pos.x + hero.width < this.pos.x - 2){
                this.vel.x = -ENEMY_VELOCITY.x
            }
        } 

        else if(this.enemyStatus && this.enemyPhase === 2){
            if(this.enemyDirection === 'left'){
                this.vel.x = -ENEMY_VELOCITY.x
                if(this.pos.x <= 150){
                    this.enemyDirection = 'right'
                }
            }
            if(this.enemyDirection === 'right'){
                this.vel.x = ENEMY_VELOCITY.x
                if(this.pos.x>= 900){
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
                    //this.pos.x = element.pos.x + element.width + 1 //you push enemy
                    element.pos.x = this.pos.x - element.width - 20   //enemy blocks you
                    element.vel.y = -15
                    element.vel.x = -50
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
                    //this.pos.x = element.pos.x - this.width - 1 //you push enemy
                    element.pos.x = this.pos.x + this.width + 20   //enemy blocks you
                    element.vel.y = -15
                    element.vel.x = 50
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

                this.colisionStatus.up = true
                element.vel.y = -20

                if(element instanceof Barrel){
                    this.hp -= 50
                    this.sounds.boxHit.play()
                    if(this.enemyDirection === 'left'){
                        element.vel.x = 5
                    }
                    else{
                        element.vel.x = -5
                    }
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
            if(element instanceof Hero){
                this.colisionStatus.up = false
                this.colisionStatus.down = false
                this.colisionStatus.left = false
                this.colisionStatus.right = false
            }
        } 

    }

    healthStatus(){
        this.previousHp = this.hp
        if(this.hp <= 0 && this.deathSound){
            this.enemyStatus = false
            this.deathSound = false
            this.sounds.death.play()
            setTimeout(() => {
                this.pos.x = undefined
            },2000)
        }
    }
}