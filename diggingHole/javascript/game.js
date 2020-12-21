class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 600
        this.canvas.height = 800

        this.drawInterval = undefined
        
        
        this.door = new Door(this.ctx, 125, 640)  
        this.hero = new Hero(this.ctx)
        this.dungeonKey = new DungeonKey(this.ctx, 550, 100)
        this.steelBoots = new SteelBoots(this.ctx, 120, 470)

        //traps
        this.floorTraps = [
            new FloorTrap(this.ctx, 395, 398),
            new FloorTrap(this.ctx, 305, 578),
            new FloorTrap(this.ctx, 520, 768)
        ]
        
        this.blocks = [
            new Block(this.ctx, 120, 730, 20, 90),
            new Block(this.ctx, 300, 100, 20, 50),
            new Block(this.ctx, 350, 730, 20, 150),
            new Block(this.ctx, 100, 500, 20, 100), 
            new Block(this.ctx, 0, 300, 20, 150),
            new Block(this.ctx, 500, 300, 20, 100),   
            new Block(this.ctx, 380, 400, 20, 200),  
            new Block(this.ctx, 300, 580, 110, 100),  
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
                this.checkHealth()
                this.gameOver()
                this.newWorld()
            },FPS)
        }
    }
 
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw(){
        this.hero.draw()

        this.door.draw()
        this.dungeonKey.draw()
        this.steelBoots.draw()

        this.blocks.forEach(elem => elem.draw())
        this.floorTraps.forEach(trap => trap.draw())
    }                    

    move(){
        this.hero.move()
    }

    checkCollisions(){
        this.blocks.forEach(block => this.hero.collision(block))
        this.door.collision(this.hero)
        this.dungeonKey.collision(this.hero)
        this.steelBoots.collision(this.hero)
        this.floorTraps.forEach(trap => trap.collision(this.hero))
    }


    checkHealth(){
        this.floorTraps.forEach(trap => this.hero.healthStatus(trap))
    }

    newWorld(){
        if(this.door.enterDoor(this.hero)){
            location.reload()
        }
    }

    gameOver(){
        if(this.hero.gameOver()){
            alert('Game Over')
        }
    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)
    }
}