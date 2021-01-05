class NumPotions{
    constructor(ctx){

        this.ctx = ctx

        this.width = 50
        this.height = 50

        this.pos = {x: 50, y: 1100}

        //sprite
        this.sprite = new Image()
        this.sprite.src = '../../../images/hud/numbers.png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrames = 5
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.onload = () => {
          this.sprite.isReady = true
          this.sprite.frameWidth = Math.floor(this.width / this.sprite.horizontalFrames)
          this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
          this.width = this.sprite.frameWidth
          this.height = this.sprite.frameHeight
        }

        this.sounds = {
            heartBeat: new Audio('./././sound/heartbeat.mp3'),
            damage: new Audio('././sound/damage-sound.mp3')
          } 
    }

    isReady() {
        return this.sprite.isReady
    }

    draw(level) {
        this.pos.y = (level*800)
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
            this.animate()
        } 
    }
    
    animate() {
        switch(this.hp) {
            case 0:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 0
                break;
            case 1:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 0
                break;
            case 2:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 1
                break;
            case 3:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 1
                break;
            case 4:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 2
                break;
            case 5:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 2
                break;
            case 6:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 3
                this.sound()
                break;
            case 7:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 3
                this.sound()
                break;
            case 8:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 4
                this.sound()
                break;
            case 9:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 4
                break;
            default:
              // code block
          } 

    }

    sound(){
        if(this.hp <= 30 && this.heartBeatSound){
            this.sounds.heartBeat.play()
            this.heartBeatSound = false
        }
        if(this.heartBeatSound){    
            setInterval(()=>{
                this.heartBeatSound = false
                clearInterval(this.soundInterval)
            },5000)
        }
    }

    healthStatus(element, hero){
        console.log(this.hp)
        this.previousHp = this.hp

        if(element instanceof FloorTrap){
            if(element.trapStatus && element.trapReady){
                this.hp -= element.damage
                element.trapReady = false
            }
        }
        else if(element instanceof RoofTrap){
            if(element.trapDamage && element.roofTrapReady){
                this.hp -= element.damage
                element.roofTrapReady = false
                element.trapDamage = false
            }
        }
        else if(element instanceof ArrowTrap){
            if(element.arrowStatus && element.arrowReady){
                this.hp -= element.damage
                element.arrowReady = false
            }
        }
        else if(element instanceof Enemy){
            if(element.colisionStatus.down || element.colisionStatus.left || element.colisionStatus.right){
                this.hp -= element.damage
            }
        }
        else if(element instanceof BasicEnemy){
            if(element.colisionStatus.down || element.colisionStatus.left || element.colisionStatus.right){
                this.hp -= element.damage
            }
            if(element.colisionStatus.up){
                hero.inventory.steelBoots ? 1 : this.hp -= element.damage 
            }
        }

        else if(element instanceof Potions){
            if(element.potionStatus && element.potionReady && this.hp < 100){
                this.hp += POTION_HEAL
                element.potionReady = false
            }
        }

        //height damage
        if(hero.heightJump.distance > 200 && hero.heightJump.distance < 400 && !hero.movements.up && hero.heightJump.damage){
            this.hp -= 30
            hero.heightJump.damage = false
        }
        if(hero.heightJump.distance > 400 && !hero.movements.up){
            this.hp = 0
        } 

        //sounds
        if(this.previousHp > this.hp){
            this.sounds.damage.play()
        }
    }
}

