class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 600
        this.canvas.height = 800


        this.drawInterval = undefined




        this.hero = new Hero(this.ctx)
        this.blocks = [
            new Block(this.ctx, 300, 700),
            new Block(this.ctx, 500, 600),
            new Block(this.ctx, 300, 300),
            new Block(this.ctx, 50, 750)
        ]
    }


    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(() => {
                this.clear()
                this.checkCollisions()
                this.move()
                this.draw()
                
            },FPS)
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw(){
        this.hero.draw()
        this.blocks.forEach(elem => elem.draw())
    }                    

    move(){
        this.hero.move()
    }

    checkCollisions(){
        this.blocks.forEach(block => this.hero.collision(block))
    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)

    }
}