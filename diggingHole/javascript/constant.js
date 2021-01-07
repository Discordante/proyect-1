

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
const KEY_POTION = 'KeyA'

//physics
const VELOCITY = {x: 5, y: 0}
const ENEMY_VELOCITY = {x: 3, y: 0}
const GRAVITY = 3
const MAX_GRAVITY = 20


//damages
const FLOOR_TRAP_DAMAGE = 20
const ROOF_TRAP_DAMAGE = 20
const ARROW_DAMAGE = 30
const BASIC_ENEMY_DAMAGE = 10
const BOSS_ENEMY_DAMAGE = 10
//arrows
const ARROW_SPEED = -15

//floor traps
const NUM_FLOOR_TRAPS = 10
const NUM_ROOF_TRAPS_INIT = 10
const NUM_ROOF_TRAPS_FINAL = 70


//health
const HERO_HEALTH = 100
const BOSS_HP = 150
const BASIC_ENEMY_HP = 50
const POTION_HEAL = 20


//distances
const ACT_ENEMY_DISTANCE = 340