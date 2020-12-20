class Door extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 100
        this.width = 95

        this.doorStatus = false

        this.img = new Image()
        this.img.src = './././images/environment/door.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
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
            return true
        }
        console.log(element.inventory.doorKey)
    }
}