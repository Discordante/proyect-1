class Potions extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.x = x
        this.y = y

        this.height = 25
        this.width = 20

        this.potionStatus = false
        this.potionReady = true

        this.img = new Image()
        this.img.src = './././images/Items/potion.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }

        this.sounds = {
            pickPotion: new Audio('./././sound/item_collision.mp3')
          }
       
        }


    draw(){
        if(this.isReady() && !this.potionStatus){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        if(super.collision(element) && this.potionReady){
            this.potionStatus = true
            this.sounds.pickPotion.play()
        }
    }
    
}