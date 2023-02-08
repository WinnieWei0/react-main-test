// 存放React.Children内的方法

import { array } from "prop-types"
import { isValidElement } from "react"
import {ReactNodeList} from 'shared/ReactTypes'
import { isValidElement,cloneAndReplaceKey } from "./ReactElement"
import {checkKeyStringCoercion} from 'shared/CheckStringCoercion'

const SEPARATOR='.'
const SUBSEPARATOR=':'
// 转义和换行键，以便作为反应器使用
function escape(key:string):string{
  const escapeRegex=/[=:]/g
  const escaperLookup={
    '=':'=0',
    ':':'=2'
  }
  const escapedString=key.replace(escapeRegex,function(match){
    return escaperLookup[match]
  })
  return '$'+escapedString
}
/**
 * @description: 获取节点的key值，没有的话则设置
 * @param {any} element
 * @param {number} index
 * @return {*}
 */
function getElementKey(element:any,index:number):string{
  if(typeof element==='object'&& element!==null&&element.key!=null){
    if(__DEV__){
      checkKeyStringCoercion(element.key)
    }
    return escape(''+element.key)
  }
  return index.toString(36)
}

// 是否有相同的key
let didWarnAboutMaps=false

/**
 * @description: 替换字符
 * @param {string} text
 * @return {*}
 */
const userProvidedKeyEscapeRegex=/\/+/g
function escapeUserProvidedKey(text:string):string{
  return text.replace(userProvidedKeyEscapeRegex,'$&/')
}

/**
 * @description: 遍历元素子节点，返回数组
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 * @param {?*} children 当前子元素
 * @param {function(*,int)} fnc 遍历的方法
 * @param {*} context 方法的内容
 * @return {object} 有子节点则返回数组，没有返回null或undefined
 */
function mapChildren(
  children:?ReactNodeList,
  func:MapFunc,
  context:mixed
):?Array<React$Node>{
  if(children===null){
    return children
  }
  const result:Array<React$Node>=[]
  let count=0
  mapIntoArray(children,result,'','',function(child){
    return func.call(context,child,count++)
  })
  return result
}

/**
 * @description: 递归遍历输出元素
 * @param {?*} children 当前子元素
 * @return {*}
 */
function mapIntoArray(
  children:?ReactNodeList,
  array:Array<React$Node>,
  escapedPrefix:string,
  nameSoFar:string,
):number{
  const type=typeof children
  if(type==='undefined' || type==='boolean'){
    children=null
  }
  let invokeCallback=false
  if(children===null){
    invokeCallback=true
  }else{
    switch(type){
      case 'string':
      case 'number':
        invokeCallback=true
        break
      case 'object':
        switch ((children:any).$$typeof){
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback=true
        }
    }
  }
  if(invokeCallback){
    // 遍历完最后一个节点时
    const child=children
    let mappedChild=callback(child)
    const childKey=nameSoFar===''?SEPARATOR+getElementKey(child,0):nameSoFar
    if(isArray(mappedCHild)){
      // 还有子元素的话递归遍历
      let escapedChildKey=''
      if(childKey!=null){
        escapedChildKey=escapeUserProvidedKey(childKey)+'/'
      }
      mapIntoArray(mappedChild,array,escapedChildKey,'',c=>c)
    }else if(mappedChild!=null){
      // 不是数组的话存入数组进行遍历
      if(isValidElement(mappedChild)){
        if(__DEV__){
          if(mappedChild.key&&(!child||child.key!==mappedChild.key)){
            checkKeyStringCoercion(mappedChild.key)
          }
        }
        mappedChild=cloneAndReplaceKey(
          mappedChild,
          escapedPrefix+(
            mappedChild.key&&(!child||child.key!==mappedChild.key)?
            escapeUserProvidedKey(''+mappedChild.key)+'/':''
          )+childKey
        )
      }
      array.push(mappedChild)
    }
    return 1
  }
  let child
  let nextName
  let subtreeCount=0
  const nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR
  if(isArray(children)){
    for(let i=0;i<children.length;i++){
      child=children[i]
      nextName=nextNamePrefix+getElementKey(child,i)
      subtreeCount+=mapIntoArray(
        child,
        array,
        escapedPrefix,
        nextName,
        callback
      )
    }
  }else{
    const iteratorFn=getIteratorFn(children)
    if(typeof iteratorFn==='function'){
      const iterableChildren:Iterable<React$Node>&{
        entries:any
      }=(children:any)
      if(__DEV__){
        if(iteratorFn===iterableChildren.entries){
          if(!didWarnAboutMaps){
            console.warn('不支持将Map用作子项。而是使用一个键控ReactElement数组。')
          }
          didWarnAboutMaps=true
        }
      }
      const iterator=iteratorFn.call(iterableChildren)
      let step
      let ii=0
      while(!(step=iterator.next()).done){
        child=step.value
        nextName=nextNamePrefix+getElementKey(child,ii++)
        subtreeCount+=mapIntoArray(
          child,
          array,
          escapedPrefix,
          nextName,
          callback
        )
      }
    }else if(type==='object'){
      const childrenString=String((children:any))
      throw new Error(
        `Objects are not valid as a React child (found: ${childrenString === '[object Object]'
          ? 'object with keys {' +
          Object.keys((children: any)).join(', ') +
          '}'
          : childrenString
        }). ` +
        'If you meant to render a collection of children, use an array ' +
        'instead.',
      );
    }
  }
  return subtreeCount
}

type MapFunc=(child:?React$Node,index:number)=>?ReactNodeList

/**
 * @description: 遍历react元素，内部调用map方法，与map不同的是不会返回数组
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 * @param
 * @return {*}
 */
function forEachChildren(
  children:?ReactNodeList,
  forEachFnc:ForEachFunc,
  forEachContext:mixed,
):viod{
  mapChildren(
    children,
    function(){
      forEachFnc.apply(this,arguments)
    },
    forEachContext
  )
}
type ForEachFunc=(child:?React$Node)=>void

/**
 * @description: 返回节点个数，即遍历节点的次数
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 * @param {*} children
 * @return {*}
 */
function countChildren(children:?ReactNodeList):number{
  let n=0
  mapChildren(children,()=>{
    n++
  })
  return n
}

/**
 * @description: 检验节点是否只有一个子元素
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 * @param {T} children
 * @return {*}
 */
function onlyChild<T>(children:T):T{
  if(!isValidElement(children)){
    throw new Error('React.Children.only expected to receive a single React element child.')
  }
  return children
}

/**
 * @description: 扁平化复杂数据结构，为每个子节点分配key，内部调用map方法
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 * @param {*} children
 * @return {*}
 */
function toArray(children:?ReactNodeList):Array<React$Node>{
  return mapChildren(children,child=>child)||[]
}

export {
  mapChildren as map,
  forEachChildren as forEach,
  countChildren as count,
  onlyChild as only,
  toArray
}