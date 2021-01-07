class NumPotions{
    constructor(ctx){

        this.ctx = ctx

        this.width = 150
        this.height = 78

        this.pos = {x: 1130, y: 300}

        //sprite
        this.sprite = new Image()
        this.sprite.src = './././images/hud/numbers.png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 5
        this.sprite.verticalFrames = 2
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0

        this.sprite.onload = () => {
          this.sprite.isReady = true
          this.sprite.frameWidth = Math.floor(this.width / this.sprite.horizontalFrames)
          this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
          this.width = this.sprite.frameWidth
          this.height = this.sprite.frameHeight
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    draw(level, hero) {
        this.pos.y = 1 + (level*800)
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
            this.animate(hero)
        } 
    }
    
    animate(hero) {
        //console.log(hero.inventory.potions)

        switch(hero.inventory.potions) {
            case 0:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 0
                break;
            case 1:
                this.sprite.horizontalFrameIndex = 4
                this.sprite.verticalFrameIndex = 1
                break;
            case 2:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 0
                break;
            case 3:
                this.sprite.horizontalFrameIndex = 2
                this.sprite.verticalFrameIndex = 0
                break;
            case 4:
                this.sprite.horizontalFrameIndex = 3
                this.sprite.verticalFrameIndex = 0
                break;
            case 5:
                this.sprite.horizontalFrameIndex = 4
                this.sprite.verticalFrameIndex = 0
                break;
            case 6:
                this.sprite.horizontalFrameIndex = 0
                this.sprite.verticalFrameIndex = 1
                break;
            case 7:
                this.sprite.horizontalFrameIndex = 1
                this.sprite.verticalFrameIndex = 1
                break;
            case 8:
                this.sprite.horizontalFrameIndex = 2
                this.sprite.verticalFrameIndex = 1
                break;
            case 9:
                this.sprite.horizontalFrameIndex = 3
                this.sprite.verticalFrameIndex = 1
                break;
            default:
              // code block
          } 

    }
}

