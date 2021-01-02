class FloorTrap extends GeneralClass{
    constructor(ctx, x, y){
        super(ctx, x, y)

        this.height = 20
        this.width = 40

        this.trapStatus = false
        this.trapReady = true
        this.damage = FLOOR_TRAP_DAMAGE

       
        this.img = new Image()
        this.img.src = './././images/traps/Spikes.png'
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }  

        this.sounds = {
            trapActive: new Audio('./././sound/Spike_Trap_1.m4a'),
        } 
        this.sounds.trapActive.volume = 0.3
    }

    isReady(){
        return this.img.ready
    }
    
    draw(){
        if(this.isReady() && this.trapStatus){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }

    collision(element){
        if(super.collision(element) && this.trapReady){
            if(element instanceof Hero && !element.inventory.steelBoots){
                this.trapStatus = true
            }
            if(element instanceof Barrel){
                this.trapReady = false
                this.trapStatus = true
            }
            if(this.trapStatus){
                this.sounds.trapActive.play()
            }
        }
    }
}
