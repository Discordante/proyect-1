class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 1200
        this.canvas.height = 800

        this.drawInterval = undefined
        
        
        //hero
        this.hero = new Hero(this.ctx)
        this.health = new Health (this.ctx)

        //environment
        this.door = new Door(this.ctx, 125, 670)  

        this.safeBoxes = [
            new SafeBox(this.ctx, 2695, 503),
        ]

        this.ladders = [
            [
                new Stairs(this.ctx, 400, 580),
                new Stairs(this.ctx, 400, 620),
                new Stairs(this.ctx, 400, 660),
                new Stairs(this.ctx, 400, 700)
            ],
            [
                new Stairs(this.ctx, 1805, 300),
                new Stairs(this.ctx, 1805, 340),
                new Stairs(this.ctx, 1805, 380)
            ]
        ]
        
        //objects
        this.barrels = [
            new Barrel(this.ctx, 300, 570, 'barrel'),
            new Barrel(this.ctx, 2080, 200, 'barrel'),
            new Barrel(this.ctx, 1700, 200, 'box'),
            new Barrel(this.ctx, 2000, 200, 'box'),
        ]

        //inventary
        this.steelBoots = new SteelBoots(this.ctx, 120, 465)
        this.dungeonKey = new DungeonKey(this.ctx, 550, 100)
        this.potionsArray = [
            new Potions(this.ctx, 470, 735)
        ]
        
        //traps
        this.arrow = new ArrowTrap(this.ctx)
        this.arrowArray = []

       
        this.floorTraps = [
            new FloorTrap(this.ctx, 395, 380),
            new FloorTrap(this.ctx, 305, 560),
            new FloorTrap(this.ctx, 220, 740)
        ]
    
        this.roofTraps = [
            new RoofTrap(this.ctx, 480, 405),
            new RoofTrap(this.ctx, 170, 530),

        ]
        
        //blocks
        this.basicBlocks = [
            //level1
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
                new BasicBlock(this.ctx, 100, 760, 'left'),
                new BasicBlock(this.ctx, 150, 760),
                new BasicBlock(this.ctx, 200, 760),
                new BasicBlock(this.ctx, 250, 760),
                new BasicBlock(this.ctx, 300, 760),
                new BasicBlock(this.ctx, 350, 760),
                new BasicBlock(this.ctx, 400, 760),
                new BasicBlock(this.ctx, 450, 760),
                new BasicBlock(this.ctx, 500, 760, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 380, 400, 'left'),
                new BasicBlock(this.ctx, 430, 400),
                new BasicBlock(this.ctx, 480, 400, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 100, 500, 'left'),
                new BasicBlock(this.ctx, 150, 500, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 300, 580, 'left'),
                new BasicBlock(this.ctx, 350, 580),
                new BasicBlock(this.ctx, 450, 580, 'right')

            ],
            //level2
            [
                new BasicBlock(this.ctx, 1600, 770, 'left'),
                new BasicBlock(this.ctx, 1650, 770),
                new BasicBlock(this.ctx, 1700, 770),
                new BasicBlock(this.ctx, 1750, 770),
                new BasicBlock(this.ctx, 1800, 770),
                new BasicBlock(this.ctx, 1850, 770),
                new BasicBlock(this.ctx, 1900, 770),
                new BasicBlock(this.ctx, 1950, 770),
                new BasicBlock(this.ctx, 2000, 770),
                new BasicBlock(this.ctx, 2050, 770),
                new BasicBlock(this.ctx, 2100, 770),
                new BasicBlock(this.ctx, 2150, 770),
                new BasicBlock(this.ctx, 2200, 770),
                new BasicBlock(this.ctx, 2250, 770),
                new BasicBlock(this.ctx, 2300, 770),
                new BasicBlock(this.ctx, 2350, 770),
                new BasicBlock(this.ctx, 2400, 770),
                new BasicBlock(this.ctx, 2450, 770, 'right')
            ],
            [
                new BasicBlock(this.ctx, 2600, 550, 'left'),
                new BasicBlock(this.ctx, 2650, 550),
                new BasicBlock(this.ctx, 2700, 550),
                new BasicBlock(this.ctx, 2750, 550),
                new BasicBlock(this.ctx, 2800, 550, 'right')
            ],
            [
                new BasicBlock(this.ctx, 1600, 300, 'left'),
                new BasicBlock(this.ctx, 1650, 300),
                new BasicBlock(this.ctx, 1700, 300),
                new BasicBlock(this.ctx, 1750, 300, 'right')
            ],
            [
                new BasicBlock(this.ctx, 1950, 300, 'left'),
                new BasicBlock(this.ctx, 2000, 300),
                new BasicBlock(this.ctx, 2050, 300),
                new BasicBlock(this.ctx, 2100, 300, 'right')
            ]

        ]

        //generate walls

        for(let i = 0; i < 16; i++){
            let auxArray1 = []
            let auxArray2 = []
            auxArray1.push(new BasicBlock(this.ctx, 0, 50 * i, 'wall-left'))
            auxArray2.push(new BasicBlock(this.ctx, 1150, 50 * i, 'wall-right'))
            if(i < 16){
                this.basicBlocks.push(auxArray1)
                this.basicBlocks.push(auxArray2)
            }
        }
        
        //enemies
        this.basicEnemies = [
            new BasicEnemy(this.ctx, 2200, 200)
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

        if(!this.door.doorLock){
            this.ctx.translate(-1550, 0)
        }

        //environment
        this.door.draw()
        this.safeBoxes.forEach(safeBox => safeBox.draw())
        this.ladders.forEach(ladder => ladder.forEach( step => step.draw()))
        this.barrels.forEach(barrel => barrel.draw())

        //inventory
        this.dungeonKey.draw()
        this.steelBoots.draw()
        this.potionsArray.forEach(potion => potion.draw())

        //HUD
        this.health.draw()

        //characters
        this.hero.draw()
        this.basicEnemies.forEach(enemy => enemy.draw())

        //traps
        this.floorTraps.forEach(trap => trap.draw())
        this.roofTraps.forEach(trap => trap.draw())
        this.arrowArray.forEach(arrow => arrow.draw())

        //floor
        this.basicBlocks.forEach(platform => platform.forEach(block => block.draw()))

        this.ctx.restore()
    }                    

    move(){
        //characters
        this.hero.move()
        this.basicEnemies.forEach(enemy => enemy.move(this.hero))

        //traps
        this.arrowArray.forEach(arrow => arrow.move(this.hero))
        this.roofTraps.forEach(trap => trap.move(this.hero))

        //environment
        this.ladders.forEach(ladder => ladder.forEach( step => step.upLadder(this.hero)))
        this.barrels.forEach(barrel => barrel.move())
    }

    generateElements(){
       if(this.arrow.generateArrow(this.hero)){
           this.arrowArray.push(new ArrowTrap(this.ctx))
       }

    }

    activateElements(){
        this.basicEnemies.forEach(enemy => enemy.activateEnemy(this.hero))
        this.safeBoxes.forEach(safeBox => safeBox.openSafeBox(this.hero))
    }

    checkCollisions(){

        //blocks
        this.basicBlocks.forEach(platform => platform.forEach(block => this.hero.collisionBlocks(block)))
        this.basicEnemies.forEach(enemy => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => enemy.collisionBlocks(block))))
        this.barrels.forEach(barrel => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => barrel.collisionBlocks(block))))

        //enemies
        this.basicEnemies.forEach(enemy => enemy.collision(this.hero))
        this.basicEnemies.forEach(enemy => this.barrels.forEach(barrel => enemy.collision(barrel)))

        //environment
        this.door.collision(this.hero)
        this.safeBoxes.forEach(safeBox => safeBox.collision(this.hero))
        this.ladders.forEach(ladder => ladder.forEach( step => step.collision(this.hero)))
        this.barrels.forEach(barrel => barrel.collision(this.hero))
        this.barrels.forEach(barrel =>  this.barrels.forEach(element => barrel.collision(element)))

       

        //inventory
        this.dungeonKey.collision(this.hero)
        this.steelBoots.collision(this.hero)
        this.potionsArray.forEach(potion => potion.collision(this.hero))

        //traps
        this.floorTraps.forEach(trap => trap.collision(this.hero))
        this.roofTraps.forEach(trap => trap.collision(this.hero))
        this.arrowArray.forEach(arrow => arrow.collision(this.hero))
    }


    checkHealth(){
        //hero
        this.floorTraps.forEach(trap => this.health.healthStatus(trap, this.hero))
        this.roofTraps.forEach(trap => this.health.healthStatus(trap, this.hero))
        this.arrowArray.forEach(arrow => this.health.healthStatus(arrow, this.hero))
        this.potionsArray.forEach(potion => this.health.healthStatus(potion, this.hero))
        this.basicEnemies.forEach(enemy => this.health.healthStatus(enemy, this.hero))
        
        //enemies
        this.basicEnemies.forEach(enemy => enemy.healthStatus())
    }

    newWorld(){
        this.door.enterDoor(this.hero)

        if(!this.door.doorLock && !this.door.doorThrough){
            this.hero.pos.x = 1700
            this.hero.pos.y = 400
            this.door.doorThrough = true
        }
    }

    gameOver(){
        if(this.health.hp <= 0 || this.hero.pos.y >= 1000){
            this.sounds.gameOver.play()
            setTimeout(() => {
                clearInterval(this.drawInterval);
            },100)

            setTimeout(() => {
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
            },2000)
            this.ctx.restore()
        }
    }

    onKeyEvent(event){
        this.hero.onKeyEvent(event)
    }
}