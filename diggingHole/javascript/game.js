class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.canvas.width = 600
        this.canvas.height = 800
        this.ctx = this.canvas.getContext('2d')


        this.drawInterval = undefined
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

    }

    move(){
        this.hero.move()
    }

    checkColisions(){

    }

    onKeyEvent(){
        this.hero.onKeyEvent()

    }
}