class Hero{
    constructor(ctx){
        this.ctx = ctx

        this.x = this.ctx.canvas.width / 2
        this.y = 10

        this.width = 0
        this.height = 0

        this.vx = 0
        this.vy = 0


        this.movements = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }

    draw(){

    }

    move(){
   
        if (this.movements.right){
            this.vx = SPEED
        } 
        else if (this.movements.left) {
            this.vx = -SPEED
        } 
        else {
            this.vx = 0
        }

        
        this.x += this.vx

    }
    
    onKeyEvent(event){  

        switch (event.key) {
            case KEY_UP:
                this.movements.up = status
                break;

            case KEY_DOWN:
                this.movements.down = status
                break;

            case KEY_RIGHT:
                this.movements.right = status
                break;

            case KEY_LEFT:
                this.movements.left = status
                break;

            default:
                break;
          }

    }
}