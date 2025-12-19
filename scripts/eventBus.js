// eventBus (vue) === pub/sub === EventEmitter
// on订阅，emit发布，bus/事件缓存队列，off取消订阅，once只订阅一次
export class EventBus {
    handlers = {
        // eventName: [() => {}, () => {}]
    }
    on(event, callback) {
        if (this.handlers[event]) {
            this.handlers[event].push(callback)
        } else {
            this.handlers[event] = [callback]
        }
    }
    once(event, callback) {
        const cb = () => {
            callback()
            this.off(event, cb)
        }

        this.on(event, cb)

    }
    emit(eventName, payload) {
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(handler => {
                handler.call(this, payload)
            });
        }
    }
    off(eventName, callback) {
        if (typeof callback === 'function') {
            this.handlers[eventName] = this.handlers[eventName].filter(handler => handler !== callback)
        } else {
            this.handlers[eventName] = []
        }
    }
    
}

// const eventEmitter = new EventBus()
// // 订阅阶段
// eventEmitter.on('customEvent', () => {
//     console.log('click1')
// })
// eventEmitter.on('customEvent', () => {
//     console.log('click2')
// })
// eventEmitter.on('customEvent', () => {
//     console.log('click3')
// })

// // 发布事件
// eventEmitter.emit('customEvent')
// eventEmitter.emit('customEvent')