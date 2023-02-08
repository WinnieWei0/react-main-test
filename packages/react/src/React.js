// 暴露的方法内容
import { map, forEach, count, toArray, only } from './ReactChildren'
import { Component,PureComponent } from './ReactBaseClasses'
import {REACT_FRAGMENT_TYPE,REACT_PROFILER_TYPE,REACT_STRICT_MODE} from 'shared/ReactSymbols'
/**React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
 * 
 */
const Children = {
  map, // 每个子节点内调用一个函数，并返回数组
  forEach, // 同map，不会返回数组
  count, // 返回组件总数，即map和forEach调用的次数
  toArray, // 把数据结构扁平化
  only, // 检验是否有一个子节点，有则返回，否则抛出错误
}
export {
  Children, // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
  Component, // https://zh-hans.reactjs.org/docs/react-component.html
  PureComponent, // 同Component，增加了shouldComponentUpdate()方法，赋相同的值时，不需要渲染，性能更高 https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent
  REACT_FRAGMENT_TYPE as Fragment, // 包住多个子元素而不用新增标签，简写<></> https://zh-hans.reactjs.org/docs/react-api.html#reactfragment
  REACT_PROFILER_TYPE as Profiler, // 测量树中元素渲染的开销 https://zh-hans.reactjs.org/docs/profiler.html
  REACT_STRICT_MODE as StrictMOde, // 严格模式，用来突出显示应用程序中潜在问题的工具，不会渲染UI https://zh-hans.reactjs.org/docs/strict-mode.html
} 