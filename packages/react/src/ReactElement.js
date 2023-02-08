import {REACT_ELEMENT_TYPE} from 'shared/ReactSymbols'
/**
 * @description: 验证object是React元素
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {*} object
 * @return {*} 是返回true
 */
export function isValidElement(object){
  return (
    typeof object==='object'&&
    object!==null&&
    object.$$typeof===REACT_ELEMENT_TYPE
  )
}

// 克隆子元素
export function cloneAndReplaceKey(oldElement,newKey){
  const newElement=ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props
  )
  return newElement
}
const ReactElement=function(type,key,ref,self,source,owner,props){
  const element={
    $$typeof:REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner:owner
  }
  if(__DEV__){
    element._store={}
    Object.defineProperty(element._store,'validated',{
      configurable:false,
      enumerable:false,
      writable:true,
      value:false
    })
    Object.defineProperty(element,'_self',{
      configurable:false,
      enumerable:false,
      writable:false,
      value:self
    })
    
  }
}