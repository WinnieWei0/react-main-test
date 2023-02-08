// 记录调用了哪个方法
const didWarnStateUpdateForUnmountedComponent = {}
function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    const constructor = publicInstance.constructor
    const componentName = (constructor && (constructor.displayName || constructor.name)) || 'ReactClass'
    const warningKey = `${componentName}.${callerName}`
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return
    }
    console.error(
      "Can't call %s on a component that is not yet mounted. " +
      'This is a no-op, but it might indicate a bug in your application. ' +
      'Instead, assign to `this.state` directly or define a `state = {};` ' +
      'class property with the desired state in the %s component.',
      callerName,
      componentName,
    );
    didWarnStateUpdateForUnmountedComponent[warningKey] = true
  }
}
// 更新队列的抽象API
const ReactNoopUpdateQueue = {
  // 检查是否已安装此复合组件。
  isMounted: function (publicInstance) {
    return false
  },
  // 组件状态已更改，但未调用setState
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate')
  },
  // 替换所有状态
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState')
  },
  enqueueSetState: function (
    publicInstance,
    partialState,
    callback,
    callerName
  ) {
    warnNoop(publicInstance, 'setState')
  }
}
export default ReactNoopUpdateQueue