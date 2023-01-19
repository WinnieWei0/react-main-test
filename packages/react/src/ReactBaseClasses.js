import ReactNoopUpdateQueue from './ReactNoopUpdateQueue'
import assign from 'shared/assign'
const emptyObject = {}

function Component(props, context, updater) {
   this.props = props
   this.context = context
   this.refs = emptyObject
   this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.isReactComponent = {}
Component.prototype.setState = function (partialState, callback) { // 这里为什么不用ES6语法
   if (typeof partialState !== 'object' & typeof partialState !== 'function' && partialState != null) {
      throw new Error('setState(...):参数为对象或函数，返回状态变化后的对象')
   }
   this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
Component.prototype.forceUpdate = function (callback) {
   this.updater.enqueueForceUpdate(this.callback, 'forceUpdate')
}

function ComponentDummy() { }
ComponentDummy.prototype = Component.prototype

function PureComponent(props, context, updater) {
   this.props = props
   this.context = context
   this.refs = emptyObject
   this.updater = updater || ReactNoopUpdateQueue
}
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy()) // ?
pureComponentPrototype.constructor = PureComponent // ?
Object.assign(pureComponentPrototype, Component, prototype)
pureComponentPrototype.isPureReactComponent = true

export { Component, PureComponent }