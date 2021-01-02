class RoofTrap extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 40
        this.width = 40

        this.trapDamage = false
        this.roofTrapReady = true

        this.damage = ROOF_TRAP_DAMAGE
        this.gravityStatus = true

        this.img = new Image()
        this.img.src = './././images/traps/Rock_02.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }  

        this.sounds = {
            rock: new Audio('./././sound/roof-trap.mp3'),
        } 
        this.sounds.rock.volume = 0.7
    }

    isReady(){
        return this.img.ready
    }

    move(){
        if(this.gravityStatus){
            this.vel.y += GRAVITY
            if(this.vel.y >= MAX_GRAVITY - 7){
                this.vel.y = MAX_GRAVITY - 7
            }
        }
        if(this.pos.y > 0 && this.pos.y < 100){
            this.sounds.rock.play()
        }
        if(this.pos.y > 5000){
            this.pos.y = -10000
            this.pos.x = Math.floor(Math.random() * 1150)
        }
        
        this.pos.y += this.vel.y
    }

    draw(){
        if(this.isReady() && this.gravityStatus){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        if(super.collision(element) && this.roofTrapReady){
            this.trapDamage = true
            this.vel.y = -20
        }
    }
}
