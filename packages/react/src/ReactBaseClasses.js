
import ReactNoopUpdateQueue from './ReactNoopUpdateQueue'
/**
 * @description: 组件更新状态的基类助手。
 * @param {*} props
 * @param {*} context
 * @param {*} updater
 * @return {*}
 */
function Component(props, context, updater) {
  this.props = props
  this.context = context
  this.refs = emptyObject
  this.updater = updater || ReactNoopUpdateQueue
}
Component.prototype.isReactComponent = {}

// 设置变量
Component.prototype.setState = function (partialState, callback) {
  if (
    typeof partialState !== 'object' &&
    typeof partialState !== 'function' &&
    partialState != null
  ) {
    throw new Error(
      'setState(...): takes an object of state variables to update or a ' +
      'function which returns an object of state variables.',
    );
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}

// 强制更新
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}

if (__DEV__) {
  const deprecatedAPIs = {
    isMounted: [
      'isMounted',
      'Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.',
    ],
    replaceState: [
      'replaceState',
      'Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).',
    ]
  }
  const defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        console.warn(
          '%s(...) is deprecated in plain JavaScript React classes. %s',
          info[0],
          info[1],
        );
        return undefined
      }
    })
  }
  for (const fnName in deprecatedAPIs) {
    if (defineDeprecationWarning.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName])
    }
  }
}

function ComponentDummy() { }
ComponentDummy.prototype = Component.prototype

export { Component }