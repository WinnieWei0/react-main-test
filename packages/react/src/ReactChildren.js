import type { ReactNodeList } from 'shared/ReactTypes'
import { getIteratorFn, REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE } from 'shared/ReactSymbols'
import { checkKeyStringCoercion } from 'shared/CheckStringCoercion'
import { isValidElement, cloneAndReplaceKey } from './ReactElement'

const SEPARATOR = '.'
const SUBSEPARATOR = ':'
const isArray = Array.isArray

// 转义
function escape(key: string): string {
    const escapeRegex = /[=:]/g
    const escaperLookup = {
        '=': '=0',
        ':': '=2'
    }
    const escapedString = key.replace(escapeRegex, function (match) {
        return escaperLookup[match]
    })
    return '$' + escapedString
}

// 遍历子节点,不需要返回值
function forEachChildren(children: ?ReactNodeList, forEachFunc: ForEachFunc, forEachContext: mixed): void {
    mapChildren(children, function () {
        forEachFunc.apply(this, arguments)
    }, forEachContext)
}
// 遍历子节点，返回Node类型的数组
type MapFunc = (child: ?React$Node, index: number) => ?ReactNodeList
function mapChildren(children: ?ReactNodeList, func: MapFunc, context: mixed): ?Array<React$Node> {
    if (children == null) {
        return children
    }
    const result: Array<React$Node> = []
    let count = 0
    mapIntoArray(children, result, '', '', function (child) {
        return func.call(context, child, count++)
    })
    return result
}
// 遍历节点方法
function mapIntoArray(children: ?ReactNodeList, array: Array<React$Node>, escapedPrefix: string, nameSoFar: string, callback: (?React$Node)=>?ReactNodeList): number {
    const type = typeof children
    if (type === 'undefined' || type === 'boolean') {
        children = null
    }
    let invokeCallback = false
    if (children === null) {
        invokeCallback = true
    } else {
        switch (type) {
            case 'string':
            case 'number':
                invokeCallback = true
                break
            case 'object':
                switch ((children: any).$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = true
                }
        }
    }
    if (invokeCallback) {
        const child = children
        let mappedChild = callback(child)
        const childKey = nameSoFar === '' ? SEPARTOR + getElementKey(child, 0) : nameSoFar
        if (isArray(mappedChild)) {
            let escapedChildKey = ''
            if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + '/'
            }
            mapIntoArray(mappedChild, array, escapedChildKey, '', c => c)
        } else if (mappedChild !== null) {
            if (isValidElement(mappedChild)) {
                mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    escapedPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key)
                        ? escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey
                )
            }
            array.push(mappedChild)
        }
        return 1
    }
    let child
    let nextName
    let subtreeCount = 0 // 统计子节点访问次数
    const nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR
    if(isArray(children)){
        for(let i=0;i<children.length;i++){
            child=children[i]
            nextName=nextNamePrefix+getElementKey(child,i)
            subtreeCount+=mapIntoArray(child,array,escapedPrefix,nextName,callback)
        }
    }else{
        const iteratorFn=getIteratorFn(children)
        if(typeof iteratorFn==='function'){
            const iterableChildren:Iterable<React$Node>&{
                entries:any
            }=(children:any)
            const iterator=iteratorFn.call(iterableChildren)
            let step
            let ii=0
            while(!(step=iterator.next()).done){
                child=step.value
                nex
            }
        }
    }
}

export {
    forEachChildren as forEach,
    mapChildren as map,
    onlyChild as only,
    toArray
}