import {injectGlobal} from 'styled-components'
import * as R from 'ramda'

injectGlobal`
  body {
    margin: 0;
  }

  #game {
    border: 1px solid;
    background-color: black;
    margin: 0 auto;
    display: block;
    margin-top: 2em;
  }
`

const createDrawBall = R.curry(({ctx, ballSize}, x, y) =>
  ctx.fillRect(x, y, ballSize, ballSize),
)

const createDrawPlayer1 = R.curry(
  ({ctx, gameHeight, playerHeight, playerWidth}, y) => {
    const realY = y + playerHeight > gameHeight ? gameHeight - playerHeight : y

    ctx.fillRect(0, realY, playerWidth, playerHeight)
  },
)
const createDrawPlayer2 = R.curry(
  ({ctx, gameWidth, gameHeight, playerHeight, playerWidth}, y) => {
    const realY = y + playerHeight > gameHeight ? gameHeight - playerHeight : y

    ctx.fillRect(gameWidth - playerWidth, realY, playerWidth, playerHeight)
  },
)

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const gameWidth = canvas.offsetWidth
const gameHeight = canvas.offsetHeight
const playerHeight = 60
const playerWidth = 10
const ballSize = playerWidth

const drawBall = createDrawBall({ctx, ballSize})
const drawPlayer1 = createDrawPlayer1({
  ctx,
  gameHeight,
  playerWidth,
  playerHeight,
})
const drawPlayer2 = createDrawPlayer2({
  ctx,
  gameHeight,
  gameWidth,
  playerHeight,
  playerWidth,
})

ctx.fillStyle = 'white'
drawBall(40, 10)
drawPlayer1(1000)
drawPlayer2(1000)
