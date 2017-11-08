import {injectGlobal} from 'styled-components'

injectGlobal`
  body {
    margin: 0;
  }

  #game {
    border: 1px solid;
  }
`

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 10, 10)
