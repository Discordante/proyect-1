class Background{
    constructor(ctx){

        this.ctx = ctx
        this.pos = {x:-50, y:-50}

        this.height = 6800
        this.width = 1500

        this.img = new Image()
        this.img.src = './././images/environment/background1.jpg'
    
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }
    }

    isReady(){
        return this.img.ready
    }

    draw(){
    if(this.isReady())
        this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
    }
    
}