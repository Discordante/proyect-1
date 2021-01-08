
const game = new Game('canvas')


let startButton = document.getElementById('start')
let continueButton = document.getElementById('continue')
let exitButton = document.getElementById('exit')
let tryAgain = document.getElementById('again')
let controls = document.getElementById('control')
let back = document.getElementById('back')


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
    
      startButton.addEventListener("click", () => {
        this.sounds.click.play()
        startButton.classList.add("hide")
        controls.classList.add("hide")

        gameStatus = true
        game.start()
      })

      continueButton.addEventListener("click", () => {
        this.sounds.click.play()

        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")
        controls.classList.add("hide")

        game.gamePause = false
        game.start()
      })

      exitButton.addEventListener("click", () => {
        exitButton.classList.add("hide")

        location.reload(); 
      })

      controls.addEventListener("click", () => {
        this.sounds.click.play()

        controls.classList.add("hide")
        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")

        back.classList.remove("hide")

        game.control(); 
      })
      

      tryAgain.addEventListener("click", () => {
        this.sounds.click.play()

        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide") 
        controls.classList.add("hide") 

        game.gamePause = false

        clearInterval(game.drawInterval)
        game.drawInterval = false
        game.clear()
        game.restart()
        game.start()
    
      })

      back.addEventListener("click", () => {
        this.sounds.click.play()

        back.classList.add("hide")

        if(game.gamePause){
          tryAgain.classList.remove("hide")
          exitButton.classList.remove("hide")
          continueButton.classList.remove("hide")
          controls.classList.remove("hide") 
        }
        else{
          start.classList.remove("hide")
          controls.classList.remove("hide")
        }
       

      })
  }