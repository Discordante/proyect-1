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
                new Stairs(this.ctx, 860, 2390)
            ],
            //level4
            [
                new Stairs(this.ctx, 550, 2800),
                new Stairs(this.ctx, 550, 2840),
                new Stairs(this.ctx, 550, 2880),
                new Stairs(this.ctx, 550, 2920),
                new Stairs(this.ctx, 550, 2960),
                new Stairs(this.ctx, 550, 3000)

            ]
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
                new BasicBlock(this.ctx, 100, 750, 'left'),
                new BasicBlock(this.ctx, 150, 750),
                new BasicBlock(this.ctx, 200, 750),
                new BasicBlock(this.ctx, 250, 750),
                new BasicBlock(this.ctx, 300, 750),
                new BasicBlock(this.ctx, 350, 750),
                new BasicBlock(this.ctx, 400, 750),
                new BasicBlock(this.ctx, 450, 750),
                new BasicBlock(this.ctx, 500, 750, 'right'),
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
                new BasicBlock(this.ctx, 100, 1200, 'left'),
                new BasicBlock(this.ctx, 150, 1200, 'right'),
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
            [
                new BasicBlock(this.ctx, 140, 3150, 'left'),
                new BasicBlock(this.ctx, 190, 3150),
                new BasicBlock(this.ctx, 240, 3150),
                new BasicBlock(this.ctx, 290, 3150),
                new BasicBlock(this.ctx, 340, 3150),
                new BasicBlock(this.ctx, 390, 3150),
                new BasicBlock(this.ctx, 440, 3150),
                new BasicBlock(this.ctx, 490, 3150),
                new BasicBlock(this.ctx, 540, 3150),
                new BasicBlock(this.ctx, 590, 3150),
                new BasicBlock(this.ctx, 640, 3150),
                new BasicBlock(this.ctx, 690, 3150),
                new BasicBlock(this.ctx, 740, 3150),
                new BasicBlock(this.ctx, 790, 3150),
                new BasicBlock(this.ctx, 840, 3150),
                new BasicBlock(this.ctx, 890, 3150),
                new BasicBlock(this.ctx, 940, 3150, 'right')
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
            //level4
            [
                new BasicBlock(this.ctx, 140, 3950, 'left'),
                new BasicBlock(this.ctx, 190, 3950),
                new BasicBlock(this.ctx, 240, 3950),
                new BasicBlock(this.ctx, 290, 3950),
                new BasicBlock(this.ctx, 340, 3950),
                new BasicBlock(this.ctx, 390, 3950),
                new BasicBlock(this.ctx, 440, 3950),
                new BasicBlock(this.ctx, 490, 3950),
                new BasicBlock(this.ctx, 540, 3950),
                new BasicBlock(this.ctx, 590, 3950),
                new BasicBlock(this.ctx, 640, 3950),
                new BasicBlock(this.ctx, 690, 3950),
                new BasicBlock(this.ctx, 740, 3950),
                new BasicBlock(this.ctx, 790, 3950),
                new BasicBlock(this.ctx, 840, 3950),
                new BasicBlock(this.ctx, 890, 3950),
                new BasicBlock(this.ctx, 940, 3950, 'right')
            ],

        ]

        //environment
        this.doors = [
            new Door(this.ctx, 125, 610),  
            new Door(this.ctx, 200, 3820)
        ]

        this.safeBoxes = [
            new SafeBox(this.ctx, 900, 3905),
        ]

         this.barrels = [
            new Barrel(this.ctx, 300, 150, 'barrel'),
            new Barrel(this.ctx, 300, 2800, 'barrel'),
            new Barrel(this.ctx, 300, 2600, 'box'),
            new Barrel(this.ctx, 850, 2800, 'box'),
        ]

        //inventary
        this.steelBoots = new SteelBoots(this.ctx, 1040, 668)
        this.dungeonKey = new DungeonKey(this.ctx, 625, 2760)
        this.potionsArray = [
            new Potions(this.ctx, 470, 725)
        ]

        //traps
        this.arrow = new ArrowTrap(this.ctx)
        this.arrowArray = []

        //floor traps
        this.floorTraps = []

        for(let i = 0; i< NUM_FLOOR_TRAPS; i++){
            this.randomX = Math.floor(Math.random() * this.basicBlocks.length)
            this.randomY = Math.floor(Math.random() * this.basicBlocks[this.randomX].length)
    
            this.floorTraps.push(new FloorTrap(this.ctx, this.basicBlocks[this.randomX][this.randomY].pos.x + 5, this.basicBlocks[this.randomX][this.randomY].pos.y - 20))
        } 
    
        //roof traps
        this.roofTraps = []

        for(let i = 0; i< NUM_ROOF_TRAPS; i++){
            this.roofTraps.push(new RoofTrap(this.ctx, Math.floor(Math.random() * 1150),  this.randomY = Math.floor(Math.random() * -100000)))
        } 

        //motion blocks
        this.blocksMotion = [
            new BlockWithMotion(this.ctx, 150, 150, 250, 400),
            new BlockWithMotion(this.ctx, 250, 300, 250, 500),
            new BlockWithMotion(this.ctx, 300, 420, 325, 700)
        ]

        this.elevatorBlocks = [
            new ElevatorBlock(this.ctx, 45, 500, 50, 500, 2800, 2),
            new ElevatorBlock(this.ctx, 200, 300, 50, 300, 700, 2),
            new ElevatorBlock(this.ctx, 1000, 3000, 150, 2650, 3200, 2),
        ]

        //generate walls

        for(let i = 0; i < 82; i++){
            let auxArray1 = []
            let auxArray2 = []
            auxArray1.push(new BasicBlock(this.ctx, 0, 50 * i, 'wall-left'))
            auxArray2.push(new BasicBlock(this.ctx, 1150, 50 * i, 'wall-right'))
            if(i < 82){
                this.basicBlocks.push(auxArray1)
                this.basicBlocks.push(auxArray2)
            }
        }
        
        //enemies
        this.basicEnemies = [
            new BasicEnemy(this.ctx, 700, 2900)
        ]


        //sound
        this.sounds = {
            gameOver: new Audio('./././sound/game-over.mp3'),
            cave: new Audio('./sound/cave-sound.mp3')
        } 
        this.sounds.gameOver.volume = 0.6
        this.sounds.cave.volume = 0.7
    }


    start(){
        this.sounds.cave.play()
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

        /* if(!this.door.doorLock){
            this.ctx.translate(0, -3200)
        } */

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
                this.ctx.translate(0,(-this.canvas.height * this.level)-50)
                break
            default:
                this.ctx.translate(0,0)
                break
        }

        //environment
        this.doors.forEach(door => door.draw())
        this.safeBoxes.forEach(safeBox => safeBox.draw())
        this.ladders.forEach(ladder => ladder.forEach( step => step.draw()))
        this.barrels.forEach(barrel => barrel.draw())

        //inventory
        this.dungeonKey.draw(this.basicEnemies[0])
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
        this.elevatorBlocks.forEach(block => block.draw())

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
        this.blocksMotion.forEach(block => block.move())
        this.elevatorBlocks.forEach(block => block.move())

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
        this.elevatorBlocks.forEach(elevatorBlock => this.hero.collisionBlocks(elevatorBlock))
        this.basicEnemies.forEach(enemy => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => enemy.collisionBlocks(block))))
        this.barrels.forEach(barrel => this.basicBlocks.forEach(blockArr => blockArr.forEach(block => barrel.collisionBlocks(block))))
        this.barrels.forEach(barrel => this.blocksMotion.forEach(block => barrel.collisionBlocks(block)))
        this.barrels.forEach(barrel => this.elevatorBlocks.forEach(block => barrel.collisionBlocks(block)))

        //enemies
        this.basicEnemies.forEach(enemy => enemy.collision(this.hero))
        this.basicEnemies.forEach(enemy => this.barrels.forEach(barrel => enemy.collision(barrel)))

        //environment
        this.doors.forEach(door => door.collision(this.hero))
        this.safeBoxes.forEach(safeBox => safeBox.collision(this.hero))
        this.ladders.forEach(ladder => ladder.forEach(step => step.collision(this.hero)))
        this.barrels.forEach(barrel => barrel.collision(this.hero))
        this.barrels.forEach(barrel =>  this.barrels.forEach(element => barrel.collision(element)))
        

        //inventory
        this.dungeonKey.collision(this.hero, this.basicEnemies[0])
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
        this.doors[0].enterDoor(this.hero)
        this.level = 4
        if(!this.doors[0].doorLock && !this.doors[0].doorThrough){
            this.hero.pos.x = 230
            this.hero.pos.y = 3800
            this.doors[0].doorThrough = true
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