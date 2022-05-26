import { DomListener } from './DomListener'

export class ExcelComponents extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {
    
  }

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  isWatching(key) {
    return this.subscribe.includes(key)  
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  init() {
    this.initDOMlistener()
  }

  destroy() {
    this.removeDOMlistener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}