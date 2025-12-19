import { EventBus } from "./eventBus.js";
class Square extends EventBus {
  #el = null
  constructor(width, height, bg, container = document.body) {
    super()
    this.width = width + "px";
    this.height = height + "px";
    this.bg = bg;

    this.container = container;

    this.create("div");
    this.#render();
    this.append(container);
  }
  create(type) {
    const target = document.createElement(type || "div")
    const handlers = {
      get(target, prop) {
        return target[prop]
      },
      set(target, prop, value) {
        target.style[prop] = value
        return true
      }
    }
    this.#el = new Proxy(target, handlers);
    this.el = target
  }
  #render() {
    this.#el.width = this.width;
    this.#el.height = this.height;
    this.#el.background = this.bg;
  }
  append(container) {
    container.appendChild(this.el);
  }
}

class Circle extends Square {
  constructor(width, height, bg, container) {
    // super等价于：执行square的constructor函数
    super(width, height, bg, container);

    this.#render();
  }
  #render() {
    this.el.style.borderRadius = "100%";
  }
}

export { Square, Circle };
