class BasicBlock{
    constructor(ctx, x, y, side){
        this.ctx = ctx

        this.side = side
        this.lenght = length

        this.width = 50
        this.height = 50

        this.finalBlock = []

        this.pos = {x, y}  // position
        this.vel = {x: 0, y: 0} // velocity
        this.accel = {x: 0, y: 0} // acceleration

        //image
        this.img = new Image()
        if(this.side === 'left'){
            this.img.src = '././images/environment/floor/Ground_10.png'
        }
        else if(this.side === 'right'){
            this.img.src = '././images/environment/floor/Ground_12.png'
        }

        else {
            this.img.src = '././images/environment/floor/Ground_11.png'
        }
        
        this.ready = false
        this.img.onload = () => {
            this.img.ready = true
        }
    }


    isReady(){
        return this.img.ready
    }

    draw(){
        if(this.isReady()){
            this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
        }
    }
    
    collision(element){
        if (this.pos.x < element.pos.x + element.width &&
            this.pos.x  + this.width > element.pos.x &&
            this.pos.y  < element.pos.y + element.height &&
            this.pos.y  + this.height > element.pos.y) {

            return true
         }
        return false
    }

    move(){
        //update position  
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y

    }

    generateElements(element){
        for(let i = 0; i < length; i++){
            this.finalBlock.push(new BasicBlock(this.ctx, (this.pos.x + length * 50), this.pos.y, 2), 4 , 2)
            if(i === this.lenght-1){
                element.push(this.finalBlock)
                this.finalBlock = []
            }
        }
    }
}