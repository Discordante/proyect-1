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
            arrowImpact: new Audio('././sound/damage-sound.mp3')
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
            this.sounds.arrowImpact.play()
        }
    }

    move(element){
       super.move(element)
       if(!this.arrowStatus){
        this.sounds.arrowShoot.play()
       }
    }

    generateArrow(element){

    }

    deleteArrow(){
    
    }
}
