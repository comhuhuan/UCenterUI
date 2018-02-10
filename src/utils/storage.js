const KEY = 'ucenter_key'

class Store {
  constructor() {
    this.store = window.sessionStorage
    this.prefix = KEY
  }
  set(key, value, fn) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
      value = value
    }
    this.store.setItem(this.prefix + key, value)

    fn && fn()
  }
  get(key, fn) {
    if(!key) {
      throw new Error('沒有找到key!')
      return
    }
    if(typeof key === 'object') {
      throw new Error('key不能是一个对象')
      return
    }
    let value = this.store.getItem(this.prefix + key)
    if(!!value) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        value = value
      }
      fn && fn();
      return value
    }
  }
  remove(key) {
    if(toString.call(key) === "[object Array]") {
      key.forEach((item, index) => {
        this.store.removeItem(this.prefix + item)
      })
    } else if(toString.call(key) === "[object String]"){
      this.store.removeItem(this.prefix + key)
    }
  }
  clear() {
    this.store.clear()
  }
}

export default new Store()
