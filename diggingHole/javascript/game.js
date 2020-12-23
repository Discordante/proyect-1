class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 600
        this.canvas.height = 800

        this.drawInterval = undefined
        
        
        //hero
        this.hero = new Hero(this.ctx)
        this.health = new Health (this.ctx)

        //dungeon
        this.door = new Door(this.ctx, 125, 640)  
        this.dungeonKey = new DungeonKey(this.ctx, 550, 100)

        //inventary
        this.steelBoots = new SteelBoots(this.ctx, 120, 465)
        this.potionsArray = [
            new Potions(this.ctx, 520, 745)
        ]
        


        //arrows
        

        //traps


        this.arrow = new Arrow(this.ctx)
        this.arrowArray = []

        this.floorTraps = [
            new FloorTrap(this.ctx, 395, 398),
            new FloorTrap(this.ctx, 305, 578),
            new FloorTrap(this.ctx, 520, 768)
        ]
        
        //blocks
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


        this.sounds = {
            gameOver: new Audio('./././sound/game-over.mp3')
        } 
        this.sounds.gameOver.volume = 0.6
    }


    start(){
        if(!this.drawInterval){
            this.drawInterval = setInterval(() => {
                this.clear()
                this.checkCollisions()
                this.move()
                this.draw()
                this.generateElements()
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
        this.health.draw()

        this.door.draw()
        this.dungeonKey.draw()
        this.steelBoots.draw()
        this.potionsArray.forEach(potion => potion.draw())


        this.blocks.forEach(elem => elem.draw())

        this.floorTraps.forEach(trap => trap.draw())
        this.arrowArray.forEach(arrow => arrow.draw())
    }                    

    move(){
        this.hero.move()
        this.arrowArray.forEach(arrow => arrow.move(this.hero))
    }

    generateElements(){
       if(this.arrow.generateArrow(this.hero)){
           this.arrowArray.push(new Arrow(this.ctx))
       }
    }

    checkCollisions(){
        this.blocks.forEach(block => this.hero.collision(block))
        this.door.collision(this.hero)

        this.dungeonKey.collision(this.hero)
        this.steelBoots.collision(this.hero)
        this.potionsArray.forEach(potion => potion.collision(this.hero))

        this.floorTraps.forEach(trap => trap.collision(this.hero))
        this.arrowArray.forEach(arrow => arrow.collision(this.hero))
    }


    checkHealth(){
        this.floorTraps.forEach(trap => this.health.healthStatus(trap))
        this.arrowArray.forEach(arrow => this.health.healthStatus(arrow))
        this.potionsArray.forEach(potion => this.health.healthStatus(potion))
    }

    newWorld(){
        if(this.door.enterDoor(this.hero)){
            location.reload()
        }
    }

    gameOver(){
        if(this.health.hp <= 0){
            this.sounds.gameOver.play()
            clearInterval(this.drawInterval);
            this.ctx.fillStyle = 'rgba(0, 0, 0)'
            this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
            this.ctx.save()
            this.ctx.font = '50px Sans-serif'
            this.ctx.fillStyle = 'red'
            this.ctx.textAlign = 'center'
            this.ctx.fillText(
                'You lose...',
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2,
            )
            this.ctx.restore()
        }
    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)
    }
}