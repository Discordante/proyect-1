class FloorTrap extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 20
        this.width = 20

        this.trapStatus = false
        this.trapReady = true
        this.damage = FLOOR_TRAP_DAMAGE

       
        /* this.img = new Image()
        this.img.src = ''
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }  */

        this.sounds = {
            trapActive: new Audio('./././sound/Spike_Trap_1.m4a'),
            trapDamage: new Audio('././sound/damage-sound.mp3')
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
        if(super.collision(element) && !element.inventory.steelBoots && this.trapReady){
            this.trapStatus = true
            this.sounds.trapActive.play()
            this.sounds.trapDamage.play()
        }
    }
}
