class Block{
    constructor(ctx, x, y){
        this.ctx = ctx

        this.width = 150
        this.height = 20

        this.pos = {x, y} // position
    }
    
    draw(){
        this.ctx.fillStyle = 'brown'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}