const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas setup
canvas.width = 1024
canvas.height = 576
c.fillRect(0,0, canvas.width, canvas.width)
const gravity = 0.5 // acceleration

// Player class, also enemy
class Sprite {
    constructor({position,velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    update (velocity) {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
// adds gravity acceleration and endpoints for maximum movement on Y axis
        if (this.position.y + this.height + this.velocity.y >= canvas.height )  {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}
// initiation of data for Player and enemy objects
const player = new Sprite({ 
    position:{x: 0, y: 0},
    velocity:{x:0,y:10}
})
const enemy = new Sprite({ 
    position:{x: 400, y: 100},
    velocity:{x:0,y:10}
})
// key controller
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {pressed:false},
    ArrowLeft: {pressed:false}
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)

    player.update()
    enemy.update()

    // key controller logic
    player.velocity.x = 0 // reset if no key pressed
    enemy.velocity.x = 0 // reset if no key pressed

    if ( keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }
    if ( keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
}
animate() // request animation loop


// key controller events
window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        // player
        case ('d') : 
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case ('a') :
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case ('w') :
            player.velocity.y = -8
            break
        // enemy
        case ('ArrowRight') : 
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case ('ArrowLeft') :
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case ('ArrowUp') :
            enemy.velocity.y = -8
            break
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player
        case ('d') : 
        keys.d.pressed = false
        break
        case ('a') :
        keys.a.pressed = false
        break
        // enemy
        case ('ArrowRight') : 
        keys.ArrowRight.pressed = false
        enemy.lastKey = 'ArrowRight'
        break
        case ('ArrowLeft') :
        keys.ArrowLeft.pressed = false
        enemy.lastKey = 'ArrowLeft'
        break
    }
})