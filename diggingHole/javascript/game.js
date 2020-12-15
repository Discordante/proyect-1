class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 600
        this.canvas.height = 800


        this.drawInterval = undefined




        this.hero = new Hero(this.ctx)
    }


    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(() => {
                this.clear()
                this.move()
                this.draw()
                this.checkColisions()

            },FPS)
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw(){
        this.hero.draw()
    }

    move(){
        this.hero.move()
    }

    checkColisions(){

    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)

    }
}