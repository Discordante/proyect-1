class Arrow extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx)

        this.height = 5
        this.width = 20

        this.pos = {x:600, y:250}  // position
        this.vel = {x: ARROW_SPEED, y: 0} // velocity

        this.arrowStatus = false
        this.arrowActive = false

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
            arrow: new Audio('')
          } 
    }

    isReady(){
        return this.img.ready
    }
    
    /* draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    } */

    collision(element){
        if(super.collision(element)){
            this.vel.x = 0
            this.arrowStatus = true
            //this.sounds.arrow.play()
        }
    }

    move(element){
       super.move(element)
    }

    generateArrow(element){
        
    }

    deleteArrow(){
    
    }
}
