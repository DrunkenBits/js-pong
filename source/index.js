import {injectGlobal} from 'styled-components'
import * as R from 'ramda'

injectGlobal`
  body {
    margin: 0;
  }

  #game {
    border: 1px solid;
    background-color: black;
  }
`

const createDrawBall = ctx => R.curry((x, y) => ctx.fillRect(x, y, 10, 10))

const createDrawPlayer = R.curry((ctx, canvasWidth, side, y) => {
  switch (side) {
    case 'right':
      ctx.fillRect(canvasWidth - 10, 10, 10, 60)
      break
    default:
      ctx.fillRect(0, 10, 10, 60)
  }
})

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const drawBall = createDrawBall(ctx)
const drawPlayer1 = createDrawPlayer(ctx, canvas.offsetWidth, 'left')
const drawPlayer2 = createDrawPlayer(ctx, canvas.offsetWidth, 'right')

ctx.fillStyle = 'white'
drawBall(40, 10)
drawPlayer1(20)
drawPlayer2(20)
