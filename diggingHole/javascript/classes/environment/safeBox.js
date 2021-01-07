class SafeBox extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 100
        this.width = 120

        this.boxStatus = false
        this.boxLock = true
        
        this.img = new Image()
        this.img.src = './././images/environment/Chest_01_Locked.png'
    
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        this.sounds = {
            close: new Audio('././sound/close_door_1.mp3'),
            open: new Audio('././sound/open-safe-box.mp3'),
            victory : new Audio('././sound/victory.mp3'),
          }

    }
    
    
    draw(){
        if(this.isReady()){
            if(!this.boxLock){
                this.img.src = './././images/environment/Chest_01_Unlocked.png'
            }
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        this.boxStatus = super.collision(element)
    }

    openSafeBox(element){
        if(this.boxStatus && element.movements.up && element.inventory.doorKey){
            this.sounds.open.play()

            setTimeout(() => {
                this.sounds.victory.play()
                this.boxLock = false
            }, 2000)
        }
        else if(this.boxStatus && element.movements.up && !element.inventory.doorKey){
            this.sounds.close.play()
        }
    }
}