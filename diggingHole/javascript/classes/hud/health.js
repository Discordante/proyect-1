class Health{
    constructor(ctx){

        this.ctx = ctx

        this.width = 400
        this.height = 250

        this.pos = {x: 0, y: 0}
        this.hp = HERO_HEALTH
        this.previousHp = 0

        this.heartBeatSound = true
        this.soundInterval = undefined

        //sprite
        this.sprite = new Image()
        this.sprite.src = './././images/hud/health-bar.png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 2
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

    draw() {
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
            case 100:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 0
                break;
            case 80:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 0
                break;
            case 70:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 1
                break;
            case 60:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 1
                break;
            case 50:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 2
                break;
            case 40:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 2
                break;
            case 30:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 3
                this.sound()
                break;
            case 20:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 3
                this.sound()
                break;
            case 10:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 4
                this.sound()
                break;
            case 0:
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
            }
        }
        else if(element instanceof ArrowTrap){
            if(element.arrowStatus && element.arrowReady){
                this.hp -= element.damage
                element.arrowReady = false
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

        if(this.previousHp > this.hp){
            this.sounds.damage.play()
        }
    }
}

