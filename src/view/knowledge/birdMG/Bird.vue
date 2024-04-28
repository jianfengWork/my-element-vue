<template>
  <div class="bird-main">
    <div id="game">
      <div id="bird"></div>
    </div>
  </div>
</template>

<script>
const pipe1 = require('./images/pipe1.png')
const pipe2 = require('./images/pipe2.png')

let game, birdEle
const bird = {
  speedX: 5,
  speedY: 0,
  x: 0,
  y: 0
}
export default {
  data() {
    return {
      running: true, // 游戏的状态
    }
  },
  mounted() {
    // 获取相应的元素
    game = document.getElementById('game')
    birdEle = document.getElementById('bird')

    // 初始化值
    bird.x = birdEle.offsetLeft
    bird.y = birdEle.offsetTop
    // console.log(bird)

    var sky = {
      x: 0
    }
    let timer = setInterval(() => {

      if (this.running) {
        // 移动背景让小鸟实现水平运动
        sky.x -= 5
        game.style.backgroundPositionX = sky.x + 'px'
        // 实现小鸟的上下运动
        bird.speedY += 1
        bird.y += bird.speedY
        if (bird.y < 0) {
          this.running = false
          bird.y = 0
        }
        if (bird.y + birdEle.offsetHeight > 600) {
          this.running = false
          bird.y = 600 - birdEle.offsetHeight
        }
        birdEle.style.top = bird.y + 'px'
      } else {
        clearInterval(timer)
      }

    }, 30)

    // 点击文档的时候实现小鸟向上运动
    document.onclick = function () {
      bird.speedY = -10;
    }

    this.createPipe(300)
    this.createPipe(500)
    this.createPipe(700)
    this.createPipe(900)
  },
  methods: {
    // 创建管道
    createPipe(position) {
      var pipe = {}
      pipe.x = position
      pipe.uHeight = 200 + parseInt(Math.random() * 100)
      pipe.dHeight = 600 - pipe.uHeight - 200
      pipe.dTop = pipe.uHeight + 200

      // 上管道
      var uPipe = document.createElement('div')
      uPipe.style.width = '52px'
      uPipe.style.height = pipe.uHeight + 'px'
      uPipe.style.background = `url(${pipe1}) no-repeat center bottom`
      uPipe.style.position = 'absolute'
      uPipe.style.top = '0px'
      uPipe.style.left = pipe.x + 'px'
      game.appendChild(uPipe)

      var dPipe = document.createElement('div')
      dPipe.style.width = '52px'
      dPipe.style.height = pipe.dHeight + 'px'
      dPipe.style.background = `url(${pipe2}) no-repeat center  top `
      dPipe.style.position = 'absolute'
      dPipe.style.top = pipe.dTop + 'px'
      dPipe.style.left = pipe.x + 'px'
      game.appendChild(dPipe)
      // 让管道运动起来
      let timer = setInterval(() => {
        if (this.running) {
          pipe.x -= 2
          uPipe.style.left = pipe.x + 'px'
          dPipe.style.left = pipe.x + 'px'
          if (pipe.x < -52) {
            pipe.x = 800
          }
          var uCheck = bird.x + 35 > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.uHeight
          var dCheck = bird.x + 35 > pipe.x && bird.x < pipe.x + 52 && bird.y > pipe.uHeight + 200
          if (uCheck || dCheck) {
            this.running = false
          }
        } else {
          clearInterval(timer)
        }
      }, 30)
    }
  }
}
</script>

<style lang="scss" scoped>
.bird-main {
  width: 100%;
  height: 100%;
  #game {
    width: 800px;
    height: 600px;
    background: url('./images/sky.png');
    position: relative;
    overflow: hidden;
  }
  #bird {
    width: 35px;
    height: 25px;
    background: url('./images/birds.png') -8px -10px no-repeat;
    position: absolute;
    top: 100px;
    left: 100px;
  }
}
</style>
