import {injectGlobal} from 'styled-components'
import * as R from 'ramda'

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
const createPlayer = R.curry((y, x) =>
  Object.assign({}, shape, {
    height: SPACING_UNIT * 10,
    width: SPACING_UNIT * 2,
    score: 0,
    x,
    y,
  }),
)
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const createCenteredPlayer = createPlayer(canvas.height / 2 - SPACING_UNIT * 5)

const players = [
  createCenteredPlayer(20),
  createCenteredPlayer(canvas.width - SPACING_UNIT * 2 - 20),
]

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

  players.forEach(player =>
    ctx.fillRect(player.x, player.y, player.width, player.height),
  )
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
