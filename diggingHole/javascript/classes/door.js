class Door extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 100
        this.width = 80

        this.doorStatus = false
        this.doorLock = false
        
        this.img = new Image()
        this.img.src = './././images/environment/door.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        this.sounds = {
            closedDoor: new Audio('././sound/close_door_1.mp3'),
            openDoor: new Audio('././sound/open_creaky_door.mp3')
          }

    }
    
    isReady(){
        return this.img.ready
    }
    
    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        this.doorStatus = super.collision(element)
    }

    enterDoor(element){
        if(this.doorStatus && element.movements.up && element.inventory.doorKey){
            this.sounds.openDoor.currentTime = 0
            this.sounds.openDoor.play()
            setTimeout(() => {
                this.doorLock = true
            }, 1700)
        }
        else if(this.doorStatus && element.movements.up && !element.inventory.doorKey){
            this.sounds.closedDoor.play()
            setInterval(() => {
                this.doorLock = false
            }, 1000)
        }
        return this.doorLock
    }
}