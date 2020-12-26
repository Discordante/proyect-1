class SteelBoots extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.x = x
        this.y = y

        this.height = 35
        this.width = 35

        this.BootsInventary = false
        this.collisionCounter = 0

        //Graphics
        this.img = new Image()
        this.img.src = './././images/Items/steel_boots.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        //Sound
        this.sounds = {
            itemCollision: new Audio('./././sound/item_collision.mp3'),
          }
    }
    
    isReady(){
        return this.img.ready
    }

    draw(){
        
        if(this.isReady() && !this.BootsInventary){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
        
    }

    collision(element){
        if(super.collision(element)){
            this.collisionCounter++
            if(this.collisionCounter === 1){
                this.sounds.itemCollision.play()
                this.BootsInventary = true
                element.inventory.steelBoots = true
            }
        }
    }
}