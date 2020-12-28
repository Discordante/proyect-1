

//frames per second

const FPS = 1000/60


//Controls: event.key

const KEY_UP = 'ArrowUp'
const KEY_RIGHT = 'ArrowRight'
const KEY_DOWN = 'ArrowDown'
const KEY_LEFT = 'ArrowLeft'
const KEY_JUMP = 'Space'
const KEY_RUN = 'ShiftLeft'
const KEY_CROUCH = 'ControlLeft'

//physics
const VELOCITY = {x: 5, y: 0}
const ENEMY_VELOCITY = {x: 3, y: 0}
const GRAVITY = 3
const MAX_GRAVITY = 20


//damages
const FLOOR_TRAP_DAMAGE = 50
const ROOF_TRAP_DAMAGE = 50
const ARROW_DAMAGE = 30
const ENEMY_DAMAGE = 10
//arrows
const ARROW_SPEED = -15


//health
const HERO_HEALTH = 100
const BASIC_ENEMY_HP = 150
const POTION_HEAL = 20


//distances
const ACT_ENEMY_DISTANCE = 350