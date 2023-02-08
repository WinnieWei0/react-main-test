// 暴露的方法内容
import { map, forEach, count, toArray, only } from './ReactChildren'
import { Component } from './ReactBaseClasses'
/**React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
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
  Children,
  Component,
} 