import { AnimateCircle } from "./animate.js";
import { randomColor, randomNum } from "./utils.js";

function createBalls(count) {
  return Array.from(Array(count), (value, index) => {
    const animCirl = new AnimateCircle(
      90,
      90,
      randomColor(),
      randomNum(-5, 5),
      randomNum(-5, 5),
      document.querySelector('.box')
    );
    animCirl.el.innerText = index + 1
    animCirl.el.style.textAlign= 'center'
    animCirl.el.style.lineHeight= '90px'

    return animCirl
  });
}

const balls = createBalls(5);

balls[1].on('collide', function({direction}) {
  // 碰撞底部，速度增加；碰撞左边，速度减慢；
  console.log(direction)
  if (direction === 'bottom') {
    this.el.style.background = randomColor()
  }
  if (direction === 'right') {
    if (this.stepx < 10) {
      this.stepx *= 1.5
    }
  }
  if (direction === 'top') {
    if (this.stepx > 5) {
      this.stepx *= 0.1
    }
  }
})

const startBtn = document.querySelector('#start-btn')
const stopBtn = document.querySelector('#stop-btn')

// 事件订阅：提前先订阅click事件
startBtn.onclick=() => {
  balls.forEach(ball => ball.tick())
}

stopBtn.addEventListener('click', (event) => {
  balls.forEach(ball => ball.cancel())
})

console.log('branch main', balls[0])
