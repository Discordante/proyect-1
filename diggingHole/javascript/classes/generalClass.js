class GeneralClass{
    constructor(ctx, x, y){
        this.ctx = ctx

        this.width = 150
        this.height = 20

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

    }

    draw(){
        this.ctx.fillStyle = 'yellow'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

}