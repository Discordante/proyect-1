class Game{
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')

        this.canvas.width = 1200
        this.canvas.height = 800

        this.level = 1

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
                new Stairs(this.ctx, 1100, 500),
                new Stairs(this.ctx, 1100, 540),
                new Stairs(this.ctx, 1100, 580),
                new Stairs(this.ctx, 1100, 620)
            ],
            [
                new Stairs(this.ctx, 950, 700),
                new Stairs(this.ctx, 950, 740),
                new Stairs(this.ctx, 950, 780),
                new Stairs(this.ctx, 950, 820),
                new Stairs(this.ctx, 950, 860),
                new Stairs(this.ctx, 950, 900),
                new Stairs(this.ctx, 950, 940),
                new Stairs(this.ctx, 950, 980)
            ],
            //level1
            [
                new Stairs(this.ctx, 250, 1400),
                new Stairs(this.ctx, 250, 1440),
                new Stairs(this.ctx, 250, 1480)
            ],
            [
                new Stairs(this.ctx, 250, 1400),
                new Stairs(this.ctx, 250, 1440),
                new Stairs(this.ctx, 250, 1480)
            ],
            [
                new Stairs(this.ctx, 195, 1200),
                new Stairs(this.ctx, 195, 1240),
                new Stairs(this.ctx, 195, 1280),
                new Stairs(this.ctx, 195, 1320)
            ],
            //level2
            [
                new Stairs(this.ctx, 860, 2150),
                new Stairs(this.ctx, 860, 2190),
                new Stairs(this.ctx, 860, 2230),
                new Stairs(this.ctx, 860, 2270),
                new Stairs(this.ctx, 860, 2310),
                new Stairs(this.ctx, 860, 2350),
                new Stairs(this.ctx, 860, 2390),
                new Stairs(this.ctx, 860, 2430),
                new Stairs(this.ctx, 860, 2470),
                new Stairs(this.ctx, 860, 2510)
            ],
            //level4
            [
                new Stairs(this.ctx, 550, 2800),
                new Stairs(this.ctx, 550, 2840),
                new Stairs(this.ctx, 550, 2880),
                new Stairs(this.ctx, 550, 2920),
                new Stairs(this.ctx, 550, 2960),
                new Stairs(this.ctx, 550, 3000),

            ]
        ]
        
        //objects
        this.barrels = [
            new Barrel(this.ctx, 300, 650, 'barrel'),
            new Barrel(this.ctx, 150, 2600, 'barrel'),
            new Barrel(this.ctx, 300, 2600, 'box'),
            new Barrel(this.ctx, 850, 2600, 'box'),
        ]

        //inventary
        this.steelBoots = new SteelBoots(this.ctx, 1040, 668)
        this.dungeonKey = new DungeonKey(this.ctx, 550, 100)
        this.potionsArray = [
            new Potions(this.ctx, 470, 735)
        ]
        
        //traps
        this.arrow = new ArrowTrap(this.ctx)
        this.arrowArray = []

       
        this.floorTraps = [
            new FloorTrap(this.ctx, 305, 560),
            new FloorTrap(this.ctx, 220, 740)
        ]
    
        this.roofTraps = [
            new RoofTrap(this.ctx, 480, 405),
            new RoofTrap(this.ctx, 170, 530),

        ]
        
        //blocks
        this.basicBlocks = [
            //level0
            [   
                new BasicBlock(this.ctx, 0, 300, 'left'),
                new BasicBlock(this.ctx, 50, 300),
                new BasicBlock(this.ctx, 100, 300),
                new BasicBlock(this.ctx, 150, 300, 'right')
            ],
            [
                new BasicBlock(this.ctx, 800, 300, 'left'),
                new BasicBlock(this.ctx, 850, 300),
                new BasicBlock(this.ctx, 900, 300),
                new BasicBlock(this.ctx, 950, 300),
                new BasicBlock(this.ctx, 1000, 300),
                new BasicBlock(this.ctx, 1050, 300),
                new BasicBlock(this.ctx, 1100, 300, 'right')
            ],
            [
                new BasicBlock(this.ctx, 800, 500, 'left'),
                new BasicBlock(this.ctx, 850, 500),
                new BasicBlock(this.ctx, 900, 500),
                new BasicBlock(this.ctx, 950, 500),
                new BasicBlock(this.ctx, 1000, 500),
                new BasicBlock(this.ctx, 1050, 500, 'right')
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
                new BasicBlock(this.ctx, 1000, 700, 'left'),
                new BasicBlock(this.ctx, 1050, 700),
                new BasicBlock(this.ctx, 1100, 700, 'right'),
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

            //level1
            [
                new BasicBlock(this.ctx, 650, 1100, 'left'),
                new BasicBlock(this.ctx, 700, 1100),
                new BasicBlock(this.ctx, 750, 1100),
                new BasicBlock(this.ctx, 800, 1100),
                new BasicBlock(this.ctx, 850, 1100),
                new BasicBlock(this.ctx, 900, 1100),
                new BasicBlock(this.ctx, 950, 1100),
                new BasicBlock(this.ctx, 1000, 1100, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 300, 1100, 'left'),
                new BasicBlock(this.ctx, 350, 1100),
                new BasicBlock(this.ctx, 400, 1100, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 900, 1400, 'left'),
                new BasicBlock(this.ctx, 950, 1400),
                new BasicBlock(this.ctx, 1000, 1400, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 600, 1400, 'left'),
                new BasicBlock(this.ctx, 650, 1400),
                new BasicBlock(this.ctx, 700, 1400, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 310, 1400, 'left'),
                new BasicBlock(this.ctx, 360, 1400),
                new BasicBlock(this.ctx, 390, 1400, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 90, 1200, 'left'),
                new BasicBlock(this.ctx, 140, 1200, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 140, 1400, 'left'),
                new BasicBlock(this.ctx, 190, 1400, 'right'),
            ],
            [
                new BasicBlock(this.ctx, 200, 1550, 'left'),
                new BasicBlock(this.ctx, 250, 1550),
                new BasicBlock(this.ctx, 300, 1550),
                new BasicBlock(this.ctx, 350, 1550),
                new BasicBlock(this.ctx, 450, 1550),
                new BasicBlock(this.ctx, 500, 1550, 'right')
            ],
            //level2
            [
                new BasicBlock(this.ctx, 350, 1850, 'left'),
                new BasicBlock(this.ctx, 400, 1850),
                new BasicBlock(this.ctx, 450, 1850),
                new BasicBlock(this.ctx, 500, 1850),
                new BasicBlock(this.ctx, 550, 1850, 'right')
            ],
            [
                new BasicBlock(this.ctx, 550, 2150, 'left'),
                new BasicBlock(this.ctx, 600, 2150),
                new BasicBlock(this.ctx, 650, 2150),
                new BasicBlock(this.ctx, 700, 2150),
                new BasicBlock(this.ctx, 750, 2150),
                new BasicBlock(this.ctx, 800, 2150, 'right')
            ],
            //level3



            //level4
            [
                new BasicBlock(this.ctx, 150, 3150, 'left'),
                new BasicBlock(this.ctx, 200, 3150),
                new BasicBlock(this.ctx, 250, 3150),
                new BasicBlock(this.ctx, 300, 3150),
                new BasicBlock(this.ctx, 350, 3150),
                new BasicBlock(this.ctx, 400, 3150),
                new BasicBlock(this.ctx, 450, 3150),
                new BasicBlock(this.ctx, 500, 3150),
                new BasicBlock(this.ctx, 550, 3150),
                new BasicBlock(this.ctx, 600, 3150),
                new BasicBlock(this.ctx, 650, 3150),
                new BasicBlock(this.ctx, 700, 3150),
                new BasicBlock(this.ctx, 750, 3150),
                new BasicBlock(this.ctx, 800, 3150),
                new BasicBlock(this.ctx, 850, 3150),
                new BasicBlock(this.ctx, 900, 3150),
                new BasicBlock(this.ctx, 950, 3150),
                new BasicBlock(this.ctx, 1000, 3150, 'right')
            ],
            [
                new BasicBlock(this.ctx, 100, 2700, 'left'),
                new BasicBlock(this.ctx, 150, 2700),
                new BasicBlock(this.ctx, 200, 2700),
                new BasicBlock(this.ctx, 250, 2700),
                new BasicBlock(this.ctx, 300, 2700),
                new BasicBlock(this.ctx, 350, 2700),
                new BasicBlock(this.ctx, 400, 2700, 'right')
            ],
            [
                new BasicBlock(this.ctx, 600, 2800, 'left'),
                new BasicBlock(this.ctx, 650, 2800, 'right')
            ],
            [
                new BasicBlock(this.ctx, 800, 2700, 'left'),
                new BasicBlock(this.ctx, 850, 2700),
                new BasicBlock(this.ctx, 900, 2700),
                new BasicBlock(this.ctx, 950, 2700, 'right')
            ],
        ]

        this.blocksMotion = [
            new BlockWithMotion(this.ctx, 150, 150, 250, 400),
            new BlockWithMotion(this.ctx, 250, 300, 250, 500),
            new BlockWithMotion(this.ctx, 300, 420, 325, 700)
        ]

        //generate walls

        for(let i = 0; i < 64; i++){
            let auxArray1 = []
            let auxArray2 = []
            auxArray1.push(new BasicBlock(this.ctx, 0, 50 * i, 'wall-left'))
            auxArray2.push(new BasicBlock(this.ctx, 1150, 50 * i, 'wall-right'))
            if(i < 64){
                this.basicBlocks.push(auxArray1)
                this.basicBlocks.push(auxArray2)
            }
        }
        
        //enemies
        this.basicEnemies = [
            new BasicEnemy(this.ctx, 700, 2900)
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
                this.levelAdmin()
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

    levelAdmin(){
        this.level = Math.floor(this.hero.pos.y / 800)
    }

    draw(){
        this.ctx.save()

        if(!this.door.doorLock){
            this.ctx.translate(-1550, 0)
        }

        switch(this.level){
            case 0:
                this.ctx.translate(0,0)
                break
            case 1:
                this.ctx.translate(0,-this.canvas.height * this.level)
                break
            case 2:
                this.ctx.translate(0,-this.canvas.height * this.level)
                break
            case 3:
                this.ctx.translate(0,-this.canvas.height * this.level)
                break
            case 4:
                this.ctx.translate(0,-this.canvas.height * this.level)
                break
            default:
                this.ctx.translate(0,0)
                break
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
        this.health.draw(this.level)

        //characters
        this.hero.draw()
        this.basicEnemies.forEach(enemy => enemy.draw())

        //traps
        this.floorTraps.forEach(trap => trap.draw())
        this.roofTraps.forEach(trap => trap.draw())
        this.arrowArray.forEach(arrow => arrow.draw())

        //floor
        this.basicBlocks.forEach(platform => platform.forEach(block => block.draw()))
        this.blocksMotion.forEach(block => block.draw())

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
        this.barrels.forEach(barrel => barrel.move())

        //floor
        this.blocksMotion.forEach(block => block.move(this.hero))

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
        this.blocksMotion.forEach(motionBlock => this.hero.collisionBlocks(motionBlock))
        this.basicEnemies.forEach(enemy => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => enemy.collisionBlocks(block))))
        this.barrels.forEach(barrel => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => barrel.collisionBlocks(block))))

        //enemies
        this.basicEnemies.forEach(enemy => enemy.collision(this.hero))
        this.basicEnemies.forEach(enemy => this.barrels.forEach(barrel => enemy.collision(barrel)))

        //environment
        this.door.collision(this.hero)
        this.safeBoxes.forEach(safeBox => safeBox.collision(this.hero))
        this.ladders.forEach(ladder => ladder.forEach(step => step.collision(this.hero)))
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
        this.floorTraps.forEach(trap => this.barrels.forEach(barrel => trap.collision(barrel)))
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
        if(this.health.hp <= 0 /* || this.hero.pos.y >= 1000 */){
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