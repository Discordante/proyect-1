class ArrowTrap extends GeneralClass{
    constructor(ctx, x, y, direction){
        super(ctx)

        this.height = 5
        this.width = 20

        this.pos = {x, y}  // position
        if(direction === 'left'){
            this.vel = {x: ARROW_SPEED, y: 0} // velocity
        }
        else{
            this.vel = {x: -ARROW_SPEED, y: 0} // velocity
        }
        

        this.arrowStatus = false
        this.arrowReady = false
        this.distanceActivation = 0

        this.damage = ARROW_DAMAGE

        this.arrowTimer = 0
        this.arrowInterval = undefined

       
        /*this.img = new Image()
        this.img.src = ''
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        } */

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
            this.pos.x = undefined
            this.arrowStatus = true
        }
    } 

    move(hero){
        this.distanceActivation = Math.hypot((this.pos.x - hero.pos.x),(this.pos.y - hero.pos.y))

        if(this.distanceActivation < 450 && Math.abs(this.pos.y - hero.pos.y) <= 20){
            this.arrowReady = true
            if(!this.arrowStatus){
                this.sounds.arrowShoot.play()
            }
        }
        if(this.arrowReady){
            super.move(hero)
        }
        
    } 
}
