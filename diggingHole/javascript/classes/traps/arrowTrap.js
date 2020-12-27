class Arrow extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx)

        this.height = 5
        this.width = 20

        this.pos = {x:600, y:250}  // position
        this.vel = {x: ARROW_SPEED, y: 0} // velocity

        this.arrowStatus = false
        this.arrowReady = true

        this.damage = ARROW_DAMAGE

        this.arrowTimer = 0
        this.arrowInterval = undefined

       
        /* this.img = new Image()
        this.img.src = ''
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }  */

        this.sounds = {
            arrowShoot: new Audio('././sound/arrow-shoot.mp3'),
          } 
    }

    
   draw(){
        if(!this.arrowStatus){
            this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        }
    } 

    collision(element){
        if(super.collision(element) && this.arrowReady){
            this.vel.x = 0
            this.arrowStatus = true
        }
    } 

    move(element){
       super.move(element)
       if(!this.arrowStatus && this.pos.x > 0){
        this.sounds.arrowShoot.play()
       }
    } 

    generateArrow(element){
        if(element.pos.y >= this.pos.y - 10 && element.pos.y <= this.pos.y + 10 && element.pos.x >= this.pos.x - 300 && this.arrowReady){
            this.arrowReady = false
            return true
        }
    }
}
