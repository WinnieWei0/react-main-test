import { any } from "prop-types"

/**
 * @description: $FlowFixMe仅在DEV中调用，因此无法返回void
 * @param {*} value
 * @return {*}
 */
function willCoercionThrow(value:mixed):boolean{
  if(__DEV__){
    try{
      testStringCoercion(value)
      return false
    }catch(e){
      return true
    }
  }
}
// 把key转换为字符串
function testStringCoercion(value:mixed){
  return ''+(value:any)
}

// 返回数据类型
function typeName(value:mixed):string{
  if(__DEV__){
    const hasToStringTag=typeof Symbol ==='function'&&Symbol.toStringTag
    const type=(hasToStringTag&&(value:any)[Symbol.toStringTag])||
      (value:any).constructor.name||
      'Object'
    return type
  }
}

/**
 * @description: 确认key是个字符串
 * @param {*} value
 * @return {*}
 */
export function checkKeyStringCoercion(value:mixed):void|string{
  if(__DEV__){
    if(willCoercionThrow(value)){
      console.error(
        'The provided key is an unsupported type %s.' +
          ' This value must be coerced to a string before before using it here.',
        typeName(value),
      );
      return testStringCoercion(value)
    }
  }
}