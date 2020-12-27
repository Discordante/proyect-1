class RoofTrap extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 30
        this.width = 30

        this.trapDamage = false
        this.roofTrapReady = true
        this.damage = ROOF_TRAP_DAMAGE
        this.gravityStatus = false

       
        this.img = new Image()
        this.img.src = './././images/traps/Rock_02.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }  

        this.sounds = {
            roofTrapActive: new Audio('./././sound/roof-trap.mp3'),
        } 
    }

    isReady(){
        return this.img.ready
    }

    move(element){
        if(this.gravityStatus){
            this.vel.y += GRAVITY
            if(this.vel.y >= MAX_GRAVITY - 5){
                this.vel.y = MAX_GRAVITY - 5
            }
        }

        if(element.pos.x + element.width >= this.pos.x && element.pos.x <= this.pos.x + 10 && element.pos.y >= this.pos.y && this.roofTrapReady){
            this.gravityStatus = true
            this.sounds.roofTrapActive.play()
        }
        this.pos.y += this.vel.y
    }

    draw(){
        if(this.isReady() && this.gravityStatus){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }


    collision(element){
        if(super.collision(element) && !element.inventory.ironHelmet && this.roofTrapReady){
            this.trapDamage = true
        }
    }
}
