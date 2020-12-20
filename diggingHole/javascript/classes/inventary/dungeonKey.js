class DungeonKey extends GeneralClass{
    constructor(ctx, x, y, height, width){
        super(ctx, x, y)

        this.x = x
        this.y = y

        this.height = 20
        this.width = 20

        this.keyInventary = false
        this.collisionCounter = 0
    }
    
    draw(){
        if(!this.keyInventary){
            this.ctx.fillStyle = 'yellow'
            super.draw()
        }
        
    }

    collision(element){
        if(super.collision(element)){
            this.collisionCounter++
        }
        if(this.collisionCounter >= 1){
            this.keyInventary = true
            element.inventory.doorKey = true
        }
    }
}