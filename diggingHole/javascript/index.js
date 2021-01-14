
let game = new Game('canvas')


let startButton = document.getElementById('start')
let continueButton = document.getElementById('continue')
let exitButton = document.getElementById('exit')
let tryAgain = document.getElementById('again')
let difficulty = document.getElementsByClassName('difficulty')
let controls = document.getElementById('control')
let controlsImg = document.getElementById('controlsImg')
let back = document.getElementById('back')
let options = document.getElementById('options')


//sound
this.sounds = {
  click: new Audio('./sound/click.mp3'),

} 
this.sounds.click.volume = 0.6




window.onload = () => {
    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
      })
    
      document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
      })
    
      //start
      startButton.addEventListener("click", () => {
        this.sounds.click.play()
        startButton.classList.add("hide")
        controls.classList.add("hide")
        options.classList.add("hide")

        gameStatus = true
        game.start()
      })
      //continue
      continueButton.addEventListener("click", () => {
        this.sounds.click.play()

        continueButton.classList.add("hide")
        controls.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")
        options.classList.add("hide")

        game.gamePause = false
        game.start()
      })
      //exit
      exitButton.addEventListener("click", () => {
        exitButton.classList.add("hide")

        location.reload(); 
      })
      //controls
      controls.addEventListener("click", () => {
        this.sounds.click.play()

        controls.classList.add("hide")
        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")
        options.classList.add("hide")

        back.classList.remove("hide")
       
        controlsImg.classList.remove("hide")
      })

      //options
      options.addEventListener("click", () => {
        this.sounds.click.play()

        controls.classList.add("hide")
        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")
        options.classList.add("hide")
        back.classList.remove("hide")
        if(!game.gamePause){
          for (let element of difficulty) {
            element.classList.remove("hide")
          }
        } 
      })

      //difficulty
      for (let element of difficulty) {
        element.addEventListener("click", () => {
          this.sounds.click.play()
    
          for (let bUttom of difficulty) {
            bUttom.classList.remove("active")
          }
          element.classList.toggle("active")

          if(element.id === "easy"){
            NUM_POTIONS = 6
            NUM_FLOOR_TRAPS = 8
            NUM_ROOF_TRAPS_INIT = 10
            NUM_ROOF_TRAPS_FINAL = 30
            BOSS_HP = 50
          }
          else if(element.id === "normal"){
            NUM_POTIONS = 4
            NUM_FLOOR_TRAPS = 12
            NUM_ROOF_TRAPS_INIT = 15
            NUM_ROOF_TRAPS_FINAL = 60
          }
          else if(element.id === "hard"){
            NUM_POTIONS = 2
            NUM_FLOOR_TRAPS = 15
            NUM_ROOF_TRAPS_INIT = 50
            NUM_ROOF_TRAPS_FINAL = 80
          }
          game = new Game('canvas')
        })
      }
     
      
      //tryAgain
      tryAgain.addEventListener("click", () => {
        this.sounds.click.play()

        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide") 
        controls.classList.add("hide") 
        options.classList.add("hide") 

        game.gamePause = false

        clearInterval(game.drawInterval)
        game.drawInterval = false
        game.clear()
        game.restart()
        game.start()
    
      })
      //back
      back.addEventListener("click", () => {
        this.sounds.click.play()

        back.classList.add("hide")
        controls.classList.remove("hide") 
        controlsImg.classList.add("hide")
        options.classList.remove("hide")
        for (let element of difficulty) {
          element.classList.add("hide")
        }
        

        if(game.gamePause){
          tryAgain.classList.remove("hide")
          exitButton.classList.remove("hide")
          continueButton.classList.remove("hide")
          
        }
        else{
          start.classList.remove("hide")
        }
      })
  }