class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 600
        this.canvas.height = 800


        this.drawInterval = undefined

        this.hero = new Hero(this.ctx)
        this.door = new Door(this.ctx, 100, 700, 40, 80)  

        this.blocks = [
            new Block(this.ctx, 120, 730, 20, 90),
            new Block(this.ctx, 350, 730, 20, 150),
            new Block(this.ctx, 100, 500, 20, 100), 
            new Block(this.ctx, 0, 300, 20, 150),  
            new Block(this.ctx, 400, 400, 20, 200),  
            new Block(this.ctx, 300, 600, 100, 100),  
            new Block(this.ctx, 50, 770, 20, 500)  
        ]
    }


    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(() => {
                this.clear()
                this.checkCollisions()
                this.move()
                this.draw()
                this.gameOver()
                
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

    gameOver(){
        if(this.hero.gameOver()){
            location.reload();
        }
    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)
    }
}