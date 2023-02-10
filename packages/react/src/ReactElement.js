import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import assign from 'shared/assign'
import ReactCurrentOwner from './ReactCurrentOwner'
import {checkKeyStringCoercion} from 'shared/CheckStringCoercion'
import hasOwnProperty from 'shared/hasOwnProperty'

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
}
/**
 * @description: 验证object是React元素
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {*} object
 * @return {*} 是返回true
 */
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  )
}

// 验证是否有ref
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get
      if (getter && getter.isReactWarning) {
        return false
      }
    }
  }
  return config.ref !== undefined
}
// 验证是否有key
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get
      if (getter && getter.isReactWarning) {
        return false
      }
    }
  }
  return config.key !== undefined
}

// 克隆子元素
export function cloneAndReplaceKey(oldElement, newKey) {
  const newElement = ReactElement(
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
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    _owner: owner
  }
  if (__DEV__) {
    element._store = {}
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    })
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    })

  }
}

/**
 * @description: 克隆并返回一个新元素
 * See https://reactjs.org/docs/react-api.html#cloneelement
 * @param {*} element
 * @param {*} config
 * @param {*} children
 * @return {*}
 */
export function cloneElement(element, config, children) {
  if (element === null || element === undefined) {
    throw new Error(
      `React.cloneElement（…）：参数必须是React元素，但您传递了 ${element}.`,
    );
  }
  let propName
  // 拷贝原先元素的props、key、ref等属性
  const props = assign({}, element.props)
  let key = element.key
  let ref = element.ref
  const self = element_self
  const source = element._source
  let owner = element._owner
  if (config != null) {
    // 验证ref的正确性
    if (hasValidRef(config)) {
      ref = config.ref
      owner = ReactCurrentOwner.current
    }
    // 验证key值
    if (hasValidKey(config)) {
      if (__DEV__) {
        checkKeyStringCoercion(config.key)
      }
      key = '' + config.key
    }
    let defaultProps
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          props[propName] = defaultProps[propName]
        } else {
          props[propName] = config[propName]
        }
      }
    }
  }
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) {
    // 如果只有一个元素，直接赋为子元素
    props.children = children
  } else if (childrenLength > 1) {
    // 孩子可以是一个以上的节点，这些节点被转移到新分配的props对象。
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }
  // 返回新元素
  return ReactElement(element.type, key, ref, self, source, owner, props)
}