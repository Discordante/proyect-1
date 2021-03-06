class DungeonKey extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.x = x
        this.y = y

        this.height = 20
        this.width = 35

        this.BootsInventary = false
        this.collisionCounter = 0

        //Graphics
        this.img = new Image()
        this.img.src = './././images/Items/Key_01.png'
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

    draw(enemy){
        if(!this.keyInventary && enemy.hp <= 0){
            if(this.isReady()){
                this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
            }
        }
    }

    collision(hero, enemy){
        if(super.collision(hero) && enemy.hp <= 0){
            this.collisionCounter++
            if(this.collisionCounter === 1){
                this.sounds.itemCollision.play()
                this.keyInventary = true
                hero.inventory.doorKey = true
            }
        }
    }
}