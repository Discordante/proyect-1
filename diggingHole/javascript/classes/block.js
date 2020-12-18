class Block{
    constructor(ctx, x, y, height, width){
        this.ctx = ctx

        this.height = height
        this.width = width

        this.pos = {x, y} // position
    }
    
    draw(){
        this.ctx.fillStyle = 'brown'
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}