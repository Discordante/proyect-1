
const game = new Game('canvas')

let startButton = document.getElementById('start')
let continueButton = document.getElementById('continue')
let exitButton = document.getElementById('exit')
let tryAgain = document.getElementById('again')

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
        game.start()
      })

      continueButton.addEventListener("click", () => {
        this.sounds.click.play()
        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide")
        game.gamePause = false
        game.start()
      })

      exitButton.addEventListener("click", () => {
        exitButton.classList.add("hide")
        location.reload(); 
      })
      tryAgain.addEventListener("click", () => {
        continueButton.classList.add("hide")
        tryAgain.classList.add("hide")
        exitButton.classList.add("hide")
        startButton.classList.add("hide") 
        location.reload();  //DUDA
      })
  }