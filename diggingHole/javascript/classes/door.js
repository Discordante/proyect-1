class Door extends GeneralClass{
    constructor(ctx, x, y, height, width){
        super(ctx, x, y)

        this.height = height
        this.width = width

        this.doorStatus = false
    }
    
    draw(){
        this.ctx.fillStyle = 'green'
        super.draw()
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