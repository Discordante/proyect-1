window.onload = () => {
    const game = new Game('canvas')

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
      })
    
      document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
      })
    
      document.addEventListener('keypress', () => {
        game.start()
      })
  }