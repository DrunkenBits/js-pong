import {injectGlobal} from 'styled-components'

const COLOR_BG = '#292A44'
const COLOR_FG = '#4AD481'
const SPACING_UNIT = 10
const PLAYER_HEIGHT = SPACING_UNIT * 6

injectGlobal`
  :root {
    background-color: ${COLOR_BG};
  }

  body {
    margin: 0;
  }

  #game {
    margin-right: auto;
    margin-left: auto;
    display: block;
    margin-top: 2em;
  }
`

const shape = {
  getLeft() {
    return this.x
  },
  getRight() {
    return this.x + this.width
  },
  getTop() {
    return this.y
  },
  getBottom() {
    return this.y + this.height
  },
}

/**
 * ball collision
 * p1 collision
 * p2 position
 * p2 collision
 */
const ball = Object.assign({}, shape, {
  height: SPACING_UNIT,
  width: SPACING_UNIT,
  x: 100,
  y: 50,
  vx: 250,
  vy: 250,
})
const player1 = {
  height: PLAYER_HEIGHT,
  width: SPACING_UNIT,
  score: 0,
  y: 0,
}
const player2 = Object.assign({}, player1)
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const update = dt => {
  ball.x += ball.vx * dt
  ball.y += ball.vy * dt

  if (ball.getLeft() < 0 || ball.getRight() > canvas.width) {
    ball.vx = -ball.vx
  }

  if (ball.getTop() < 0 || ball.getBottom() > canvas.height) {
    ball.vy = -ball.vy
  }

  ctx.fillStyle = COLOR_BG
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = COLOR_FG
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height)

  ctx.strokeStyle = COLOR_FG
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

let lastTime
const tick = millis => {
  if (lastTime) {
    update((millis - lastTime) / 1000)
  }
  lastTime = millis
  requestAnimationFrame(tick)
}

tick()
