import { Circle, Square } from "./square.js";

class AnimateCircle extends Circle {
  x
  y
  stepx
  stepy
  constructor(width, height, bg, stepx = 1, stepy = 1, container) {
    // super等价于：执行square的constructor函数
    super(width, height, bg, container);
    this.stepx = stepx;
    this.stepy = stepy;
    this.x = 100;
    this.y = 100;

    this.el.style.position = "absolute";
    this.container.style.position = "relative";

    this.border = this.getBorder();

    this.cancelId = null;
    this.audio = this.createSound();
    // this.tick();
  }
  getBorder() {
    const el = this.el;
    const container = this.container;

    return {
      top: el.offsetTop,
      bottom: container.clientHeight - el.offsetHeight - el.offsetTop,
      left: el.offsetLeft,
      right: container.clientWidth - el.offsetWidth - el.offsetLeft,
    };
  }
  transform() {
    const { top, left, bottom, right } = this.border;

    if (this.y <= -top || this.y >= bottom) {
      if (this.y <= -top) {
        this.emit("collide", { direction: "top" });
      }
      if (this.y >= bottom) {
        this.emit("collide", { direction: "bottom" });
      }

      this.audio.play();
      this.stepy *= -1;
    }
    if (this.x <= -left || this.x >= right) {
      if (this.x <= -left) {
        this.emit("collide", { direction: "left" });
      }
      if (this.x >= right) {
        this.emit("collide", { direction: "right" });
      }

      this.audio.play();
      this.stepx *= -1;
    }
    this.x += this.stepx;
    this.y += this.stepy;

    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }
  createSound() {
    return new Audio("./assets/pengzhuang.wav");
  }
  tick() {
    // setInterval
    this.transform();
    this.cancelId = requestAnimationFrame(() => {
      this.cancelId = this.tick();
    });
    return this.cancelId;
  }
  cancel() {
    if (this.cancelId) {
      cancelAnimationFrame(this.cancelId);
    }
  }
}

// 了解发布订阅模式

class MoveSquare extends Square {
  // 通过键盘的上下左右按键控制他的移动
  // 贪吃蛇
}

export { AnimateCircle };
