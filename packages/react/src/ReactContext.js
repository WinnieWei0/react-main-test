import { REACT_PORTAL_TYPE,REACT_CONTEXT_TYPE } from "shared/ReactSymbols";
import type {ReactProviderType} from 'shared/ReactTypes'
import type {ReactContext} from 'shared/ReactTypes'
import { REACT_PROVIDER_TYPE } from "../../shared/ReactSymbols";

export function createContext<T>(defaultValue:T):ReactContext<T>{
    const context:ReactContext<T>={
        $$typeof:REACT_CONTEXT_TYPE,
        _currentValue:defaultValue,
        _currentValue2:defaultValue,
        _threadCount:0,
        Provider:(null:any),
        Consumer:(null:any),
        _defaultValue:(null:any),
        _globalName:(null:any)
    }
    context.Provider={
        $$typeof:REACT_PROVIDER_TYPE,
        _context:context
    }

    let hasWarnedAboutUsingNestedContextConsumer=false
    let hasWarnedAboutUsingConsumerProvider=false
    let hasWarnedAboutDisplayNameOnConsumer=false

    if(__DEV__){
        const Consumer={
            $$typeof:REACT_CONTEXT_TYPE,
            _context:context
        }
        Object.defineProperties(Consumer,{
            Provider:{
                get(){
                    if(!hasWarnedAboutUsingConsumerProvider){
                        hasWarnedAboutUsingConsumerProvider=true
                        console.error('不支持呈现＜Context.Consumer.Provider＞，将在“”中删除+未来的主要版本。您是否打算改为呈现<Context.Provider>')
                    }
                    return context.Provider
                },
                set(_Provider:ReactProviderType<T>){
                    context.Provider=_Provider
                }
            },
            _currentValue:{
                get(){
                    return context._currentValue
                },
                set(_currentValue:T){
                    context._currentValue=_currentValue
                }
            },
            _currentValue2:{
                get(){
                    return context._currentValue2
                },
                set(_currentValue2:T){
                    context._currentValue2=_currentValue2
                }
            },
            _threadCount:{
                get(){
                    return context._threadCount
                },
                set(_threadCount:number){
                    context._threadCount=_threadCount
                }
            },
            Consumer:{
                get(){
                    if(!hasWarnedAboutUsingNestedContextConsumer){
                        hasWarnedAboutUsingNestedContextConsumer=true
                        console.error('不支持呈现<Context.Consumer.Consumer>，将在“”中删除+未来的主要版本。你的意思是渲染＜Context.Consumer＞吗？')
                    }
                    return context.Consumer
                }
            },
            displayName:{
                get(){
                    return context.displayName
                },
                set(displayName:void|string){
                    if(!hasWarnedAboutDisplayNameOnConsumer){
                        hasWarnedAboutDisplayNameOnConsumer=true
                        console.warn('在Context.Consumer上设置“displayName”无效+“您应该在context.displayName=“%s”的上下文中直接设置它。',displayName)
                    }
                }
            }
        })
        context.Consumer=Consumer
    }else{
        context.Consumer=context
    }
    if(__DEV__){
        context._currentRenderer=null
        context._currentRenderer2=null
    }
    return context
}