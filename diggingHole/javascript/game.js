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
        this.door = new Door(this.ctx, 125, 680)  
        this.dungeonKey = new DungeonKey(this.ctx, 550, 100)

        //inventary
        this.steelBoots = new SteelBoots(this.ctx, 120, 465)
        this.potionsArray = [
            new Potions(this.ctx, 520, 745)
        ]
        


        
        

        //traps

        //arrows
        this.arrow = new Arrow(this.ctx)
        this.arrowArray = []

        //floor
        this.floorTraps = [
            new FloorTrap(this.ctx, 395, 398),
            new FloorTrap(this.ctx, 305, 578),
            new FloorTrap(this.ctx, 520, 768)
        ]
        
        //roof
        this.roofTraps = [
            new RoofTrap(this.ctx, 480, 405),

        ]
        
        //blocks
        this.blocks = [
            new Block(this.ctx, 350, 730, 20, 150),
            new Block(this.ctx, 100, 500, 20, 100), 
            new Block(this.ctx, 380, 400, 20, 200),  
            new Block(this.ctx, 300, 580, 110, 100),  
            new Block(this.ctx, 1000, 770, 20, 500)
        ]

        this.floorGenerator = new BasicBlock(this.ctx)
        this.basicBlocks = [
            [   
                new BasicBlock(this.ctx, 0, 300, 'left'),
                new BasicBlock(this.ctx, 50, 300),
                new BasicBlock(this.ctx, 100, 300),
                new BasicBlock(this.ctx, 150, 300, 'right')
            ],
            [
                new BasicBlock(this.ctx, 500, 300, 'left'),
                new BasicBlock(this.ctx, 550, 300, 'right')
            ],
            [
                new BasicBlock(this.ctx, 100, 770, 'left'),
                new BasicBlock(this.ctx, 150, 770),
                new BasicBlock(this.ctx, 200, 770),
                new BasicBlock(this.ctx, 250, 770),
                new BasicBlock(this.ctx, 300, 770),
                new BasicBlock(this.ctx, 350, 770),
                new BasicBlock(this.ctx, 400, 770),
                new BasicBlock(this.ctx, 450, 770),
                new BasicBlock(this.ctx, 500, 770, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 380, 400, 'left'),
                new BasicBlock(this.ctx, 430, 770),
                new BasicBlock(this.ctx, 430, 770),
                new BasicBlock(this.ctx, 480, 770, 'right')
            ]

        ]

        //enemies
        this.basicEnemies = [
            new BasicEnemy(this.ctx, 1380, 200)
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
                this.generateElements()
                this.activateElements()
                this.move()
                this.draw()
                this.checkCollisions()
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
        this.ctx.save()

        if(!this.door.enterDoor(this.hero)){
            this.ctx.translate(-950, 0)
        }

        this.hero.draw()
        this.health.draw()

        this.basicEnemies.forEach(enemy => enemy.draw())

        this.door.draw()
        this.dungeonKey.draw()
        this.steelBoots.draw()
        this.potionsArray.forEach(potion => potion.draw())


        //floor
        this.blocks.forEach(elem => elem.draw())
        this.basicBlocks.forEach(platform => platform.forEach(block => block.draw()))
        
        //traps
        this.floorTraps.forEach(trap => trap.draw())
        this.roofTraps.forEach(trap => trap.draw())
        this.arrowArray.forEach(arrow => arrow.draw())

        this.ctx.restore()
    }                    

    move(){
        this.hero.move()

        this.basicEnemies.forEach(enemy => enemy.move(this.hero))

        this.arrowArray.forEach(arrow => arrow.move(this.hero))
        this.roofTraps.forEach(trap => trap.move(this.hero))
    }

    generateElements(){
       if(this.arrow.generateArrow(this.hero)){
           this.arrowArray.push(new Arrow(this.ctx))
       }

       this.floorGenerator.generateElements(this.basicBlocks)

       /* let auxFloor = []
       for(let i = 0; i<5; i++){
           auxFloor.push(new BasicBlock(this.ctx, (200 + i * 50), 300, 2))
           if(i === 4){
            this.basicBlocks.push(auxFloor)
            auxFloor = []
        }
       } */
    }

    activateElements(){
        this.basicEnemies.forEach(enemy => enemy.activateEnemy(this.hero))
    }

    checkCollisions(){

        //blocks
        this.blocks.forEach(block => this.hero.collisionBlocks(block))
        this.basicBlocks.forEach(platform => platform.forEach(block => this.hero.collisionBlocks(block)))
        this.basicEnemies.forEach(enemy => this.blocks.forEach(block => enemy.collisionBlocks(block)))

        //enemies
        this.basicEnemies.forEach(enemy => enemy.collision(this.hero))

        //environment
        this.door.collision(this.hero)
        this.dungeonKey.collision(this.hero)
        this.steelBoots.collision(this.hero)
        this.potionsArray.forEach(potion => potion.collision(this.hero))

        //traps
        this.floorTraps.forEach(trap => trap.collision(this.hero))
        this.roofTraps.forEach(trap => trap.collision(this.hero))
        this.arrowArray.forEach(arrow => arrow.collision(this.hero))
    }


    checkHealth(){
        this.floorTraps.forEach(trap => this.health.healthStatus(trap))
        this.roofTraps.forEach(trap => this.health.healthStatus(trap))
        this.arrowArray.forEach(arrow => this.health.healthStatus(arrow))
        this.potionsArray.forEach(potion => this.health.healthStatus(potion))

        this.basicEnemies.forEach(enemy => this.health.healthStatus(enemy))
        
    }

    newWorld(){
        if(!this.door.enterDoor(this.hero) && !this.door.doorThrough){
            this.hero.pos.x = 1100
            this.hero.pos.y = 400
            this.door.doorThrough = true
        }
    }

    gameOver(){
        if(this.health.hp <= 0 || this.hero.pos.y >= 1000){
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